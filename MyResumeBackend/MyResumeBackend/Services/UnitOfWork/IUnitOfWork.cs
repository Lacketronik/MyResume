using MyResumeBackend.Repositories;
using System.Data;

namespace MyResumeBackend.Services.UnitOfWork
{
    public interface IUnitOfWork
    {
        IInformationRepository infos { get; }
        IExperienceRepository exps { get; }
        IEducationRepository edus { get; }
        ICertificationRepository certs { get; }
        IProjectRepository projs { get; }
        IFileRepository files { get; }

        IDbTransaction BeginTransaction();
        void Commit();
        void Rollback();
    }
}
