namespace MyResumeBackend.DTOs
{
    public class InformationDTO
    {
        public string name { get; set; }
        public string linkedin { get; set; }
        public Guid? resumeFileID { get; set; }
        public Guid? profileImageID { get; set; }
        public IEnumerable<string> introduction { get; set; }
        public IEnumerable<string> role { get; set; }
    }
}