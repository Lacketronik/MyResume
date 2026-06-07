namespace MyResumeBackend.DTOs
{
    public class CertificationDTO
    {
        public string id { get; set; }
        public string title { get; set; }
        public string provider { get; set; }
        public string examCode { get; set; }
        public DateTime issueDate {  get; set; }
        public DateTime? expirationDate { get; set; }
        public string verificationLink { get; set; }
        public string status { get; set; }
    }
}
