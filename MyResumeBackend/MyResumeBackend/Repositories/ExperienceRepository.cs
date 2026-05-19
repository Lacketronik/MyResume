using Dapper;
using MyResumeBackend.DTOs;
using System.Data;

namespace MyResumeBackend.Repositories
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly IDbConnection _connection;
        private readonly Func<IDbTransaction> _transactionProvider;

        public ExperienceRepository(IDbConnection connection, Func<IDbTransaction> transactionProvider)
        {
            _connection = connection;
            _transactionProvider = transactionProvider;
        }

        public async Task<IEnumerable<ExperienceDTO>> GetExperience()
        {
            return await SqlMapper.QueryAsync<ExperienceDTO>(
                _connection,
                "GetExperience",
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
