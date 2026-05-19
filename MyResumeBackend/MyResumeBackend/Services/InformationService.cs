using MyResumeBackend.DTOs;
using MyResumeBackend.Services.UnitOfWork;

namespace MyResumeBackend.Services
{
    public class InformationService : IInformationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public InformationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<InformationDTO> GetInformation()
        {
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var info = await _unitOfWork.infos.GetInformation();
                transaction.Commit();
                return info;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
