using Core.Entities.Order;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int delivery, string cartId, Address shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersAsync(string buyerEmail);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<Delivery>> GetDeliveryAsync();
    }
}
