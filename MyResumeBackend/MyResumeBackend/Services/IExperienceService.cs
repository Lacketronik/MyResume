using MyResumeBackend.DTOs;

namespace MyResumeBackend.Services
{
    public interface IExperienceService
    {
        Task<IEnumerable<ExperienceDTO>> GetExperience();
    }
}
