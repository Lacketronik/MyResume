using Dapper;
using MyResumeBackend.DTOs;
using System.Data;

namespace MyResumeBackend.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IDbConnection _connection;
        private readonly Func<IDbTransaction> _transactionProvider;

        public ProjectRepository(IDbConnection connection, Func<IDbTransaction> transactionProvider)
        {
            _connection = connection;
            _transactionProvider = transactionProvider;
        }

        public async Task<IEnumerable<ProjectDTO>> GetProject()
        {
            return await SqlMapper.QueryAsync<ProjectDTO>(
                _connection,
                "GetProject",
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
