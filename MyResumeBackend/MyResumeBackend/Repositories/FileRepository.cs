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

        public async Task<IEnumerable<FileDTO>> GetFilesByIDs(IEnumerable<string> ids)
        {
            if (ids == null) return Array.Empty<FileDTO>();
            var dt = new DataTable();
            dt.Columns.Add("Id", typeof(Guid));
            if (ids != null)
            {
                foreach (var s in ids)
                    dt.Rows.Add(Guid.Parse(s));
            }

            var parameters = new DynamicParameters();
            parameters.Add("@Ids", dt.AsTableValuedParameter("dbo.GuidList"));

            return await SqlMapper.QueryAsync<FileDTO>(
                _connection,
                "GetFilesByIDs",
                parameters,
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}
