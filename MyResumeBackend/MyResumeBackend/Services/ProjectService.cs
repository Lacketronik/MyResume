using MyResumeBackend.Services.UnitOfWork;
using System.Linq;

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
            return await _unitOfWork.projs.GetProject();
        }

        public async Task<DTOs.ImageDTO> GetImageDetails(string imageID)
        {
            return await _unitOfWork.projs.GetImageDetails(imageID);
        }

        public async Task<IEnumerable<DTOs.ImageDTO>> GetImageDetailsByIDs(IEnumerable<string> imageIDs)
        {
            if (imageIDs == null) return Enumerable.Empty<DTOs.ImageDTO>();
            return await _unitOfWork.projs.GetImageDetailsByIDs(imageIDs);
        }
    }
}
