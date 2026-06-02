namespace MyResumeBackend.DTOs
{
    public class FileDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string path { get; set; }
        public string extension { get; set; }
        public string type { get; set; }
        public DateTime uploadedAt { get; set; }
    }
}
