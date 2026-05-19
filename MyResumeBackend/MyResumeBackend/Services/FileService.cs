using MyResumeBackend.DTOs;
using MyResumeBackend.Services.UnitOfWork;

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
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var file = await _unitOfWork.files.GetFileByID(id);
                transaction.Commit();
                return file;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
