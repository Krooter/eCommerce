using Core.Entities;
using Core.Entities.Order;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Data.BLogic
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText("../Data/BLogic/Seed/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }
                    
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("../Data/BLogic/Seed/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductCategories.Any())
                {
                    var categoriesData = File.ReadAllText("../Data/BLogic/Seed/category.json");

                    var categories = JsonSerializer.Deserialize<List<ProductCategory>>(categoriesData);

                    foreach (var item in categories)
                    {
                        context.ProductCategories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Data/BLogic/Seed/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Delivery.Any())
                {
                    var deliveryData = File.ReadAllText("../Data/BLogic/Seed/delivery.json");

                    var delivery = JsonSerializer.Deserialize<List<Delivery>>(deliveryData);

                    foreach (var item in delivery)
                    {
                        context.Delivery.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception exception)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(exception.Message);
            }
        }
    }
}
