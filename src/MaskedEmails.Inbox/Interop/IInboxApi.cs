using MaskedEmails.Inbox.Model;
using Refit;
using System.Net.Http;
using System.Threading.Tasks;

namespace MaskedEmails.Inbox.Interop
{
    public interface IInboxApi
    {
        [Post("/emails")]
        [Headers("Authorization: Bearer")]
        Task<InboxMessageSpec[]> GetMessages([Body] string[] inboxes);

        [Post("/emails/body")]
        [Headers("Authorization: Bearer")]
        Task<HttpContent> GetMessageBody([Body] string location, string view = null);
    }
}
