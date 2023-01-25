
using System.Security.Claims;
using System.Text.Json;
using MaskedEmails.Inbox.Interop;
using MaskedEmails.Inbox.Model;
using MaskedEmails.Services.Interop;

public sealed class MessagesController : ApiControllerBase
{
    private readonly IProfilesService service_;
    private readonly IInboxApi inbox_;

    public MessagesController(
        IInboxApi inbox,
        IProfilesService service
    )
    {
        inbox_ = inbox;
        service_ = service;
    }

    [FunctionName("get-messages-my")]
    public async Task<IActionResult> GetMessagesAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "messages/my")] HttpRequest request,
        [UserInfo] ClaimsPrincipal identity,
        ILogger log
    )
    {
        string? location = GetQueryParameter(request, "location");
        string? view = GetQueryParameter(request, "view");

        if (!GetAuthenticatedUserId(identity, out var identifier))
            return BadRequest();

        if (string.IsNullOrWhiteSpace(location))
            return await GetInboxMessages(identifier!, log);
        else
            return await GetInboxMessage(location, view, log);
    }

    private async Task<IActionResult> GetInboxMessages(string identifier, ILogger logger_)
    {
        var addresses = (await service_
                .GetMaskedEmails(identifier))
                .Select(a => a.EmailAddress)
                .ToArray()
                ;

        try
        {
            logger_.LogDebug($"Retrieving messages from the following inboxes:");
            logger_.LogDebug(string.Join(", ", addresses));

            var messages = await inbox_.GetMessages(addresses);

            return Ok(messages);
        }
        catch (Refit.ApiException e)
        {
            return StatusCode((int)e.StatusCode);
        }
    }

    private async Task<IActionResult> GetInboxMessage(string location, string? view, ILogger logger_)
    {
        try
        {
            logger_.LogDebug($"Retrieving message located at '{location}'.");

            var content = await inbox_.GetMessageBody(location, view);
            var rawText = await content.ReadAsStringAsync();

            return content.Headers.ContentType?.MediaType switch {
                "application/json" => Ok(JsonSerializer.Deserialize<InboxMessage>(rawText)),
                "text/plain" => Ok(rawText),
                _ => Ok(rawText),
            };
        }
        catch (Refit.ApiException e)
        {
            return StatusCode((int)e.StatusCode);
        }
    }
}