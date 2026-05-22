using MyResumeBackend.Services.UnitOfWork;

namespace MyResumeBackend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<DTOs.ProjectDTO>> GetProject()
        {
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var projs = await _unitOfWork.projs.GetProject();
                transaction.Commit();
                return projs;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public async Task<DTOs.ImageDTO> GetImageDetails(string imageID)
        {
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var imageDetails = await _unitOfWork.projs.GetImageDetails(imageID);
                transaction.Commit();
                return imageDetails;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
