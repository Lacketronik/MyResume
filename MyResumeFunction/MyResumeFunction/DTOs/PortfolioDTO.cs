namespace MyResumeBackend.DTOs
{
    public class PortfolioDTO
    {
        public InformationDTO information { get; set; }
        public IEnumerable<ExperienceDTO> experiences { get; set; }
        public IEnumerable<EducationDTO> educations { get; set; }
        public IEnumerable<CertificationDTO> certifications { get; set; }
        public IEnumerable<ProjectDTO> projects { get; set; }
        public IEnumerable<FileDTO> files { get; set; }
        public IEnumerable<ImageDTO> imageDetails { get; set; }
    }
}
