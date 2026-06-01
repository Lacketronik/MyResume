using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();
builder.Services.AddSingleton(sp =>
{
    string connectionString = builder.Configuration["CosmosConnectionString"];

    bool isLocalHttpEmulator = string.Equals(
        builder.Configuration["IsLocalHttpEmulator"],
        "true",
        StringComparison.InvariantCultureIgnoreCase
     );

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

    return new CosmosClient(connectionString);
});

builder.Build().Run();
