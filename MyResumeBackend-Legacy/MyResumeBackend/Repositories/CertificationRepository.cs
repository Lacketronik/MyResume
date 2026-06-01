using Dapper;
using MyResumeBackend.DTOs;
using System.Data;

namespace MyResumeBackend.Repositories
{
    public class CertificationRepository : ICertificationRepository
    {
        private readonly IDbConnection _connection;
        private readonly Func<IDbTransaction> _transactionProvider;

        public CertificationRepository(IDbConnection connection, Func<IDbTransaction> transactionProvider)
        {
            _connection = connection;
            _transactionProvider = transactionProvider;
        }

        public async Task<IEnumerable<CertificationDTO>> GetCertification()
        {
            return await SqlMapper.QueryAsync<CertificationDTO>(
                _connection,
                "GetCertification",
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
