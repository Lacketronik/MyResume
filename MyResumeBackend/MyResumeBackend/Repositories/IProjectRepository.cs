using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<ProjectDTO>> GetProject();
    }
}
