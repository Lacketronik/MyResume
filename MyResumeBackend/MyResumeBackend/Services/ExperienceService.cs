using MyResumeBackend.DTOs;
using MyResumeBackend.Services.UnitOfWork;

namespace MyResumeBackend.Services
{
    public class ExperienceService : IExperienceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExperienceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ExperienceDTO>> GetExperience()
        {
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var exps = await _unitOfWork.exps.GetExperience();
                transaction.Commit();
                return exps;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
