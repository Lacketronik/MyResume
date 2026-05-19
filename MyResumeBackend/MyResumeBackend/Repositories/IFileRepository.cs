using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IFileRepository
    {
        Task<FileDTO?> GetFileByID(string id);
    }
}
