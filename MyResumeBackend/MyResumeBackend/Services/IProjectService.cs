using MyResumeBackend.DTOs;

namespace MyResumeBackend.Services
{
    public interface IProjectService
    {
        public Task<IEnumerable<ProjectDTO>> GetProject();
        public Task<PortfolioDTO> GetPortfolio();
    }
}
