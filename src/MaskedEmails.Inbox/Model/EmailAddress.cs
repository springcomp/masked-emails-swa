using System.Text.Json.Serialization;

namespace MaskedEmails.Inbox.Model
{
    public sealed class EmailAddress
    {
        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }
        [JsonPropertyName("address")]
        public string Address { get; set; }
    }
}
