using MyResumeBackend.Repositories;
using System.Data;

namespace MyResumeBackend.Services.UnitOfWork
{
    public interface IUnitOfWork
    {
        IInformationRepository infos { get; }

        IDbTransaction BeginTransaction();
        void Commit();
        void Rollback();
    }
}
