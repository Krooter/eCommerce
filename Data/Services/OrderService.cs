using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<Delivery> _deliveryRepo;
        private readonly IGenericRepository<Photo> _photoRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly ICartRepository _cartRepo;

        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<Delivery> deliveryRepo, IGenericRepository<Photo> photoRepo,
            IGenericRepository<Product> productRepo, ICartRepository cartRepo)
        {
            _orderRepo = orderRepo;
            _deliveryRepo = deliveryRepo;
            _photoRepo = photoRepo;
            _productRepo = productRepo;
            _cartRepo = cartRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryId, string cartId, Address shippingAddress)
        {
            //get cart from repo
            var cart = await _cartRepo.GetCartAsync(cartId);
            //get items from product repo
            var items = new List<OrderItem>();
            foreach(var item in cart.Items)
            {
                var productItem = await _productRepo.GetByIdAsync(item.Id);
                var photo = await _photoRepo.GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, photo.PhotoUrl1);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            //get delivery from repo
            var delivery = await _deliveryRepo.GetByIdAsync(deliveryId);
            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            //create order
            var order = new Order(items, buyerEmail, shippingAddress, delivery, subtotal);
            //save to db
            //return order
            return order;
        }

        public Task<IReadOnlyList<Delivery>> GetDeliveryAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}
