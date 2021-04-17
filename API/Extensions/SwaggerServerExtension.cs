using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServerExtension
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1.0", new OpenApiInfo { Title = "eCommerce API", Version = "v1.0" });

                //var securitySchem = new OpenApiSecurityScheme
                //{
                //    Description = "JWT Auth Bearer Schem",
                //    Name = "Authorization",
                //    In = ParameterLocation.Header,
                //    Type = SecuritySchemeType.Http,
                //    Scheme = "bearer",
                //    Reference = new OpenApiReference
                //    {
                //        Type = ReferenceType.SecurityScheme,
                //        Id = "bearer"
                //    }
                //};

                //c.AddSecurityDefinition("Bearer", securitySchem);
                //var securityRequiments = new OpenApiSecurityRequirement { { securitySchem, new[] { "bearer" } } };

                //c.AddSecurityRequirement(securityRequiments);
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "eCommerce API v1.0");
            });

            return app;
        }
    }
}
