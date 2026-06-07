namespace MyResumeBackend.DTOs
{
    public class ProjectDTO
    {
        public string name { get; set; }
        public IEnumerable<ProjectDescriptionDTO> descriptions { get; set; }
        public IEnumerable<string> videoLinks { get; set; }
        public IEnumerable<Guid> imageBlobIDs { get; set; }
        public string? githubUrl { get; set; }
        public DateTime projectDate { get; set; }
        public IEnumerable<Guid> projectFileIDs { get; set; }
        public IEnumerable<string> technologies { get; set; }
    }
}
