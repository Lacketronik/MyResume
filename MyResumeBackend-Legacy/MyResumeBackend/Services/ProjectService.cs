using MyResumeBackend.DTOs;
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

        public async Task<DTOs.PortfolioDTO> GetPortfolio()
        {
            PortfolioDTO portfolio = new PortfolioDTO
            {
                information = await _unitOfWork.infos.GetInformation(),
                experiences = await _unitOfWork.exps.GetExperience(),
                educations = await _unitOfWork.edus.GetEducation(),
                certifications = await _unitOfWork.certs.GetCertification(),
                projects = await _unitOfWork.projs.GetProject(),
                files = await _unitOfWork.files.GetFiles(),
                imageDetails = await _unitOfWork.projs.GetImages()
            };
            return portfolio;
        }
    }
}
