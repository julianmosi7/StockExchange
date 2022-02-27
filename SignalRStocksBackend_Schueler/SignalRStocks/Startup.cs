using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SignalRStocks.Entities;
using SignalRStocks.Hubs;
using SignalRStocks.Services;
using System;

namespace SignalRStocks
{
    public class Startup
    {
        private readonly string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(myAllowSpecificOrigins,
              x => x
                    .SetIsOriginAllowed(_ => true)
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
            );
            });
            services.AddSingleton<StockTickerService>();
            services.AddSingleton<StockService>();
            services.AddSingleton<StockContext>();
            services.AddSignalR();
            services.AddSingleton<StockHub>();

            services.AddMvc(options => options.EnableEndpointRouting = false);
        }

        [Obsolete("IHostingEnvironment is obsolete")]
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseCors(myAllowSpecificOrigins);
            app.UseEndpoints(endpoints => endpoints.MapHub<StockHub>("/stockHub"));
            app.UseMvc();
        }
    }
}
