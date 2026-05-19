using MyResumeBackend.DTOs;

namespace MyResumeBackend.Services
{
    public interface ICertificationService
    {
        public Task<IEnumerable<CertificationDTO>> GetCertification();
    }
}
