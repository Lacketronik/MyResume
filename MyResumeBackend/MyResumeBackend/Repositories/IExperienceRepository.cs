using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IExperienceRepository
    {
        Task<IEnumerable<ExperienceDTO>> GetExperience();
    }
}
