using MyResumeBackend.DTOs;

namespace MyResumeBackend.Services
{
    public interface IInformationService
    {
        Task<InformationDTO> GetInformation();
    }
}
