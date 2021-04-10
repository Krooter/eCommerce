using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace Data.BLogic
{
    public class CartRepository : ICartRepository
    {
        private readonly IDatabase _database;
        public CartRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task<bool> DeleteCartAsync(string CartId)
        {
            return await _database.KeyDeleteAsync(CartId);
        }

        public async Task<CustomerCart> GetCartAsync(string CartId)
        {
            var data = await _database.StringGetAsync(CartId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerCart>(data);
        }

        public async Task<CustomerCart> UpdateCartAsync(CustomerCart Cart)
        {
            var created = await _database.StringSetAsync(Cart.Id, JsonSerializer.Serialize(Cart), TimeSpan.FromDays(7));

            if (!created) return null;

            return await GetCartAsync(Cart.Id);

        }
    }
}
