namespace MyResumeBackend.DTOs
{
    public class ProjectDTO
    {
        public string name { get; set; }
        public string description { get; set; }
        public Guid[]? videoBlobIDs { get; set; }
        public Guid[]? imageBlobIDs { get; set; }
        public string? githubUrl { get; set; }
        public Guid[]? ProjectFileID { get; set; }
    }
}
