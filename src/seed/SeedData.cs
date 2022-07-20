using Azure.Storage.Queues;
using CosmosDb.Model;
using CosmosDb.Model.Interop;
using CosmosDb.Model.Shim;
using CosmosDb.Utils.Interop;
using MaskedEmails.Services.Configuration.Extensions;

public static class SeedData
{
	public static void EnsureSeedData(IServiceProvider serviceProvider)
		=> EnsureSeedDataAsync(serviceProvider)
				.GetAwaiter()
				.GetResult()
				;

	private static async Task EnsureSeedDataAsync(IServiceProvider serviceProvider)
	{
		await EnsureCosmosDbSeedData(serviceProvider);
		await EnsureStorageQueue(serviceProvider);
	}

	private static async Task EnsureStorageQueue(IServiceProvider serviceProvider)
	{
#if DEBUG
		var queueName = Config.GetStorageQueueName();

		var configuration = serviceProvider.GetRequiredService<IConfiguration>();
		var connectionString = configuration.GetStorageConnectionString();
		var service = new QueueServiceClient(connectionString);

		var queue = service.GetQueueClient(queueName);
		await queue.CreateIfNotExistsAsync();

		Console.WriteLine($"Storage queue '{queueName}' created successfully.");
#endif
	}

	private static async Task EnsureCosmosDbSeedData(IServiceProvider serviceProvider)
	{
#if DEBUG
		using var scope = serviceProvider.CreateScope();

		var operations = scope.ServiceProvider.GetRequiredService<ICosmosOperations>();
		await operations.CreateDatabaseIfNotExistsAsync(Constants.DatabaseId);

		var maskedEmailsDb = operations.GetDatabase(Constants.DatabaseId);
		await operations.CreateContainerIfNotExistsAsync(maskedEmailsDb, Constants.ContainerName, Constants.PartitionKeyPath);
		await operations.CreateContainerIfNotExistsAsync(maskedEmailsDb, ConstantsShim.ContainerName, ConstantsShim.PartitionKeyPath);

		var shim = operations.GetContainer(maskedEmailsDb, ConstantsShim.ContainerName);

		var context = scope.ServiceProvider.GetRequiredService<ICosmosDbContext>();

		foreach (var profile in Config.GetProfiles())
		{
			var cosmosProfile = await context.GetProfile(profile.Id);
			if (cosmosProfile == null)
			{
				// insert shim record

				var item = new ProfileShim {
					Id = profile.EmailAddress,
					UserId = profile.Id,
				};

				await operations.CreateOrReplaceItemAsync(
					shim, 
					item,
					item.Id
					);

				// insert profile record

				cosmosProfile = new CosmosDb.Model.Profile()
				{
					Id = profile.Id,
					EmailAddress = profile.EmailAddress,
					DisplayName = profile.DisplayName,
					ForwardingAddress = profile.ForwardingAddress,
					CreatedUtc = DateTime.UtcNow,
				};

				// insert profile addresses

				foreach (var address in profile.Addresses)
					cosmosProfile.Addresses.Add(new CosmosDb.Model.Address()
					{
						Name = address.Name,
						Description = address.Description,
						EmailAddress = address.EmailAddress,
						EnableForwarding = address.EnableForwarding,
						Received = address.Received,
						CreatedUtc = address.CreatedUtc,
					});

				await context.InserProfile(cosmosProfile);
				Console.WriteLine($"Profile {profile.DisplayName} created.");
			}
			else
			{
				Console.WriteLine($"Profile {profile.DisplayName} already created.");
			}
		}
#endif
	}
}