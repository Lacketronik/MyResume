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


        public UnitOfWork(IConfiguration config)
        {
            _connection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
            _connection.Open();

            infos = new InformationRepository(_connection, () => _transaction);
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
