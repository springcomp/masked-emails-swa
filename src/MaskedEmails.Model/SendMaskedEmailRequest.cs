namespace MaskedEmails.Model
{
	public sealed class SendMaskedEmailRequest{
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public string HtmlBody { get; set; }
    }
}