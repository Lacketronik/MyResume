using MyResumeBackend.DTOs;
using MyResumeBackend.Services.UnitOfWork;

namespace MyResumeBackend.Services
{
    public class EducationService : IEducationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public EducationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<EducationDTO>> GetEducation()
        {
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var edus = await _unitOfWork.edus.GetEducation();
                transaction.Commit();
                return edus;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
