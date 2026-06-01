using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface IInformationRepository
    {
        Task<InformationDTO> GetInformation();
    }
}