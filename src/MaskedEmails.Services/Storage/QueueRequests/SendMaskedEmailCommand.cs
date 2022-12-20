using Newtonsoft.Json;

namespace MaskedEmails.Services.Storage.QueueRequests
{
    public class SendMaskedEmailCommand : MaskedEmailCommand
    {
        public SendMaskedEmailCommand()
        {
            Command = "send-email";
        }

        [JsonProperty("sender")]
        public string Sender { get; set; }
        [JsonProperty("subject")]
        public string Subject { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
