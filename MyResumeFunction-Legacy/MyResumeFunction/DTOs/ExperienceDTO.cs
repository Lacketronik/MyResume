namespace MyResumeBackend.DTOs
{
    public class ExperienceDTO
    {
        public string company { get; set; }
        public string position { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? endDate { get; set; }
        public IEnumerable<string> responsibilities { get; set; }
    }
}
