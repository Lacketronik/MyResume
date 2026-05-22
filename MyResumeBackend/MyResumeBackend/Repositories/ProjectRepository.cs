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

        public async Task<ImageDTO> GetImageDetails(string imageID)
        {
            var param = new DynamicParameters();
            param.Add("@ImageID", imageID);
            return await SqlMapper.QueryFirstOrDefaultAsync<ImageDTO>(
                _connection,
                "GetImageDetails",
                param,
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }

        public async Task<IEnumerable<ImageDTO>> GetImageDetailsByIDs(IEnumerable<string> imageIDs)
        {
            if (imageIDs == null) return Array.Empty<ImageDTO>();
            var dt = new DataTable();
            dt.Columns.Add("Id", typeof(Guid));
            if (imageIDs != null)
            {
                foreach (var s in imageIDs)
                    dt.Rows.Add(Guid.Parse(s));
            }

            var parameters = new DynamicParameters();
            parameters.Add("@Ids", dt.AsTableValuedParameter("dbo.GuidList"));

            return await SqlMapper.QueryAsync<ImageDTO>(
                _connection,
                "GetImageDetailsByIDs",
                parameters,
                commandType: CommandType.StoredProcedure,
                transaction: _transactionProvider());
        }
    }
}