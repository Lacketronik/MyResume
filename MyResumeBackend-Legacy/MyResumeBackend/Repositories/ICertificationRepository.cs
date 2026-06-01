using MyResumeBackend.DTOs;

namespace MyResumeBackend.Repositories
{
    public interface ICertificationRepository
    {
        Task<IEnumerable<CertificationDTO>> GetCertification();
    }
}
