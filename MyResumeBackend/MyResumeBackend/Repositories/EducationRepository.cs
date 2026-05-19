using Dapper;
using MyResumeBackend.DTOs;
using System.Data;

namespace MyResumeBackend.Repositories
{
    public class EducationRepository : IEducationRepository
    {
        private readonly IDbConnection _connection;
        private readonly Func<IDbTransaction> _transactionProvider;

        public EducationRepository(IDbConnection connection, Func<IDbTransaction> transactionProvider)
        {
            _connection = connection;
            _transactionProvider = transactionProvider;
        }

        public async Task<IEnumerable<EducationDTO>> GetEducation()
        {
            return await SqlMapper.QueryAsync<EducationDTO>(
                _connection,
                "GetEducation",
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
