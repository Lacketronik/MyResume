using MyResumeBackend.DTOs;

namespace MyResumeBackend.Services
{
    public interface IFileService
    {
        public Task<FileDTO?> GetFileByID(string id);
    }
}
