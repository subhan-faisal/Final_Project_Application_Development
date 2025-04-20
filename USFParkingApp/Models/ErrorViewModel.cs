namespace USFParkingApp.Models
{
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        // This property returns true if the RequestId is not null or empty, otherwise false
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
