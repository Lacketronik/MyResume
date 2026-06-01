using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IEducationRepository
    {
        Task<IEnumerable<EducationDTO>> GetEducation();
    }
}
