using Dapper;
using MyResumeBackend.DTOs;
using System.Data;
using System.Data.SqlClient;

namespace MyResumeBackend.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly IDbConnection _connection;
        private readonly Func<IDbTransaction> _transactionProvider;

        public FileRepository(IDbConnection connection, Func<IDbTransaction> transactionProvider)
        {
            _connection = connection;
            _transactionProvider = transactionProvider;
        }

        public async Task<IEnumerable<FileDTO>> GetFiles()
        {
            return await SqlMapper.QueryAsync<FileDTO>(
                _connection,
                "GetFiles",
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
