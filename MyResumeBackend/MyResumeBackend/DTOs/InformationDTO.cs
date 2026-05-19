namespace MyResumeBackend.DTOs
{
    public class InformationDTO
    {
        public string name { get; set; }
        public string linkedin { get; set; }
        public string[] introduction {  get; set; }
        public string[] role { get; set; }
        public string? resumeFileID { get; set; }
    }
}