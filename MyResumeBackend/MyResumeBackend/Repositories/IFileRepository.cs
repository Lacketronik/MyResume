using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IFileRepository
    {
        Task<IEnumerable<FileDTO>> GetFiles();
    }
}
