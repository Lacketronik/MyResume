using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IFileRepository
    {
        Task<FileDTO?> GetFileByID(string id);
        Task<IEnumerable<FileDTO>> GetFilesByIDs(IEnumerable<string> ids);
    }
}
