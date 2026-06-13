using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();
builder.Services.AddSingleton(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    string connectionString = builder.Configuration["CosmosConnectionString"];

    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("CRITICAL: 'CosmosConnectionString' is missing from App Settings!");
    }

    string isLocal = builder.Configuration["IsLocalHttpEmulator"];
    bool isLocalHttpEmulator = !string.IsNullOrEmpty(isLocal) && isLocal.Equals("true", StringComparison.OrdinalIgnoreCase);

    if (isLocalHttpEmulator)
    {
        var localOptions = new CosmosClientOptions
        {
            ConnectionMode = ConnectionMode.Gateway,
            HttpClientFactory = () => new HttpClient(new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
            })
        };
        return new CosmosClient(connectionString, localOptions);
    }
    else
    {
        try
        {
            var client = new CosmosClient(connectionString);
            return client;
        }
        catch (Exception ex)
        {
            throw new Exception($"COSMOS_ERROR: {ex.Message} | Inner: {ex.InnerException?.Message}", ex);
        }
    }
});

builder.Build().Run();
