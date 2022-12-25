using MaskedEmails.Model;
using MaskedEmails.Services.Interop;
using System.Security.Claims;
public sealed class ProfilesController : ApiControllerBase
{
	const string AUTOGENERATE_EMAIL = null;

	private readonly IConfiguration configuration_;
	private readonly IProfilesService service_;

	public ProfilesController(
		  IConfiguration configuration
		, IProfilesService service
	)
	{
		configuration_ = configuration;
		service_ = service;
	}

	[FunctionName("get-profiles-my")]
	public async Task<IActionResult> GetMyProfileAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profiles/my")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var profile = await service_
				.GetProfile(identifier)
			;

		return Ok(profile);
	}

	[FunctionName("patch-profiles-my")]
	public async Task<IActionResult> UpdateUserProfileAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "profiles/my")] UpdateProfileRequest profile,
		[UserInfo] ClaimsPrincipal identity
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var updated = await service_
			.UpdateProfile(identifier, profile.DisplayName, profile.ForwardingAddress);
		;

		return Ok(updated);
	}

	[FunctionName("post-profiles-my-addresses-email")]
	public async Task<IActionResult> CreateMaskedEmailAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "profiles/my/addresses")] CreateMaskedEmailRequest request,
		[UserInfo] ClaimsPrincipal identity,
		HttpRequest req
	)
	{
		// the angular application does not pass a specific email address
		// some other clients might want to specify a specific email address

		string? email = AUTOGENERATE_EMAIL;
		email = GetQueryParameter(req, email);

		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		try
		{

			MaskedEmailWithPassword address = null;

			if (email == AUTOGENERATE_EMAIL)
			{
				address = await service_
						.CreateMaskedEmail(identifier,
							request.Name,
							request.PasswordHash,
							request.Description,
							request.ForwardingEnabled
							);
			}

			else
			{
				address = await service_
						.CreateMaskedEmail(identifier,
							request.Name,
							email,
							request.PasswordHash,
							request.Description,
							request.ForwardingEnabled
							);
			}

			// TODO: 201
			return Ok(address);
		}
		catch (ArgumentException)
		{
			return Conflict();
		}
	}

	[FunctionName("get-profiles-my-search")]
	public async Task<IActionResult> SearchMaskedEmailsAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profiles/my/search")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity
	)
	{
		string? contains = GetQueryParameter(request, "contains");
		int top = GetQueryParameter(request, "top", 25);
		string? cursor = GetQueryParameter(request, "cursor");
		string sort_by = GetQueryParameter(request, "sort_by", "created-utc-desc");

		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var page = await service_
			.GetMaskedEmails(identifier, top, cursor, sort_by, search: contains);

		return Ok(page);
	}

	[FunctionName("get-profiles-my-address-pages")]
	public async Task<IActionResult> GetMaskedEmailsPagingAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profiles/my/address-pages")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity
	)
	{
		int top = GetQueryParameter(request, "top", 25);
		string? cursor = GetQueryParameter(request, "cursor");
		string sort_by = GetQueryParameter(request, "sort_by", "created-utc-desc");

		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var page = await service_
			.GetMaskedEmails(identifier, top, cursor, sort_by, search: null);

		return Ok(page);
	}

	[FunctionName("get-profiles-my-addresses")]
	public async Task<IActionResult> GetMaskedEmailsAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profiles/my/addresses")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var addresses = await service_
				.GetMaskedEmails(identifier)
			;

		return Ok(addresses);
	}

	[FunctionName("get-profiles-my-addresses-email")]
	public async Task<IActionResult> GetMaskedEmailAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profiles/my/addresses/{email}")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity,
		string email
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var address = await service_
				.GetMaskedEmail(identifier, email)
			;

		return Ok(address);
	}

	[FunctionName("patch-profiles-my-addresses-email-enableForwarding")]
	public async Task<IActionResult> ToggleMaskedEmailForwardingAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "profiles/my/addresses/{email}/enableForwarding")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity,
		string email
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		var address = await service_
				.ToggleMaskedEmailForwarding(identifier, email)
			;

		return Ok(address);
	}

	[FunctionName("patch-profiles-my-addresses-email")]
	public async Task<IActionResult> UpdateMaskedEmailAsync(
			[HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "profiles/my/addresses/{email}")] UpdateMaskedEmailRequest request,
			[UserInfo] ClaimsPrincipal identity,
			string email
		)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		await service_
				.UpdateMaskedEmail(identifier,
					email,
					request.Name,
					request.Description,
					request.PasswordHash
					);

		return Ok();
	}

	[FunctionName("delete-profiles-my-addresses-email")]
	public async Task<IActionResult> DeleteMaskedEmailsAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "profiles/my/addresses/{email}")] HttpRequest request,
		[UserInfo] ClaimsPrincipal identity,
        string email
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		await service_.DeleteMaskedEmail(identifier, email)
			;

		return NoContent();
	}

	[FunctionName("post-profiles-send-email")]
	public async Task<IActionResult> SendMaskedEmailAsync(
		[HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "profiles/my/addresses/{email}")] SendMaskedEmailRequest request,
		[UserInfo] ClaimsPrincipal identity,
		string email
	)
	{
		if (!GetAuthenticatedUserId(identity, out var identifier))
			return BadRequest();

		await service_.SendMaskedEmail(
			identifier!,
			email,
			request.To,
			request.Subject,
			request.HtmlBody
			);

		return NoContent();
	}
}
