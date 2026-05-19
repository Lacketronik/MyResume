using Dapper;
using MyResumeBackend.DTOs;
using System.Data;

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

        public async Task<FileDTO?> GetFileByID(string id)
        {
            var param = new DynamicParameters();
            param.Add("FileID", id);
            return await SqlMapper.QueryFirstOrDefaultAsync<FileDTO>(
                _connection,
                "GetFile",
                param,
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
