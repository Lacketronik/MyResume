using Dapper;
using MyResumeBackend.DTOs;
using System.Data;

namespace MyResumeBackend.Repositories
{
    public class InformationRepository : IInformationRepository
    {
        private readonly IDbConnection _connection;
        private readonly Func<IDbTransaction> _transactionProvider;

        public InformationRepository(IDbConnection connection, Func<IDbTransaction> transactionProvider)
        {
            _connection = connection;
            _transactionProvider = transactionProvider;
        }

        public async Task<InformationDTO> GetInformation()
        {
            return (await SqlMapper.QueryAsync<InformationDTO>(
                _connection, 
                "GetInformation", 
                commandType: CommandType.StoredProcedure, 
                transaction:_transactionProvider())).FirstOrDefault();
        }
    }
}
