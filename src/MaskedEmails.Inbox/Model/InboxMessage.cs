using System;
using System.Text.Json.Serialization;

namespace MaskedEmails.Inbox.Model
{
	public class InboxMessageSpec
	{
		[JsonPropertyName("location")]
		public string Location { get; set; }
		[JsonPropertyName("receivedUtc")]
		public DateTime ReceivedUtc { get; set; }
		[JsonPropertyName("subject")]
		public string Subject { get; set; }
        [JsonPropertyName("sender")]
		public EmailAddress Sender { get; set; }
	}

	public sealed class InboxMessage : InboxMessageSpec
	{
		[JsonPropertyName("htmlBody")]
		public string HtmlBody { get; set; }
		[JsonPropertyName("textBody")]
		public string TextBody { get; set; }
	}
}
