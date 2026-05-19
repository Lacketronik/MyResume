using MyResumeBackend.DTOs;

namespace MyResumeBackend.Services
{
    public interface IEducationService
    {
        public Task<IEnumerable<EducationDTO>> GetEducation();
    }
}
