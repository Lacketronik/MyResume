using MyResumeBackend.DTOs;
using MyResumeBackend.Services.UnitOfWork;
using System.Linq;

namespace MyResumeBackend.Services
{
    public class FileService : IFileService
    {
        private readonly IUnitOfWork _unitOfWork;

        public FileService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<FileDTO?> GetFileByID(string id)
        {
            return await _unitOfWork.files.GetFileByID(id);
        }

        public async Task<IEnumerable<FileDTO>> GetFilesByIDs(IEnumerable<string> ids)
        {
            if (ids == null) return Enumerable.Empty<FileDTO>();
            return await _unitOfWork.files.GetFilesByIDs(ids);
        }
    }
}
