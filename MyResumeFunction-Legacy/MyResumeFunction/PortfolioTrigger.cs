using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyResumeBackend.DTOs;
using System.Net;

namespace MyResumeFunction;

public class PortfolioTrigger
{
    private readonly ILogger<PortfolioTrigger> _logger;
    private readonly IConfiguration _configuration;
    private readonly CosmosClient _cosmosClient;

    public PortfolioTrigger(ILogger<PortfolioTrigger> logger, IConfiguration configuration, CosmosClient cosmosClient)
    {
        _logger = logger;
        _configuration = configuration;
        _cosmosClient = cosmosClient;
    }

    [Function("Portfolio")]
    public async Task<HttpResponseData> RunAsync([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
    {
        _logger.LogInformation("Portfolio Triggered too!");

        string dbName = _configuration["CosmosTargetDatabase"];
        string containerName = _configuration["CosmosTargetContainer"];
        var container = _cosmosClient.GetContainer(dbName, containerName);

        try
        {
            var queryDefinition = new QueryDefinition("SELECT * FROM c");

            using var feedIterator = container.GetItemQueryIterator<PortfolioDTO>(queryDefinition);

            if (feedIterator.HasMoreResults)
            {
                var currentResultSet = await feedIterator.ReadNextAsync();

                PortfolioDTO item = currentResultSet.FirstOrDefault();

                if (item != null)
                {
                    var responseMessage = req.CreateResponse(HttpStatusCode.OK);
                    await responseMessage.WriteAsJsonAsync(item);
                    return responseMessage;
                }
            }

            var emptyResponse = req.CreateResponse(HttpStatusCode.NotFound);
            await emptyResponse.WriteStringAsync("No documents found in the container.");
            return emptyResponse;
        }
        catch (CosmosException ex)
        {
            _logger.LogError($"Cosmos DB Error: {ex.Message}");
            var errorResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
            await errorResponse.WriteStringAsync("Failed to query database data.");
            return errorResponse;
        }
    }
}