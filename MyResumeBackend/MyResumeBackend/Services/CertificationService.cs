using MyResumeBackend.Services.UnitOfWork;

namespace MyResumeBackend.Services
{
    public class CertificationService : ICertificationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CertificationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<DTOs.CertificationDTO>> GetCertification()
        {
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var certs = await _unitOfWork.certs.GetCertification();
                transaction.Commit();
                return certs;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
