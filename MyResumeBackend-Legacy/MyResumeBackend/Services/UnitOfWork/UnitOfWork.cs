using MyResumeBackend.Repositories;
using System.Data;
using System.Data.SqlClient;

namespace MyResumeBackend.Services.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbConnection _connection;
        private IDbTransaction _transaction;

        public IInformationRepository infos { get; }
        public IExperienceRepository exps { get; }
        public IEducationRepository edus { get; }
        public ICertificationRepository certs { get; }
        public IProjectRepository projs { get; }
        public IFileRepository files { get; }


        public UnitOfWork(IConfiguration config)
        {
            _connection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
            _connection.Open();

            infos = new InformationRepository(_connection, () => _transaction);
            exps = new ExperienceRepository(_connection, () => _transaction);
            edus = new EducationRepository(_connection, () => _transaction);
            certs = new CertificationRepository(_connection, () => _transaction);
            projs = new ProjectRepository(_connection, () => _transaction);
            files = new FileRepository(_connection, () => _transaction);
        }

        public IDbTransaction BeginTransaction()
        {
            _transaction = _connection.BeginTransaction();
            return _transaction;
        }
        public void Commit() => _transaction?.Commit();
        public void Rollback() => _transaction?.Rollback();

        public void Dispose()
        {
            _transaction?.Dispose();
            _connection?.Dispose();
        }

    }
}
