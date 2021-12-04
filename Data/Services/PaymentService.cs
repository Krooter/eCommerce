using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specification;
using Microsoft.Extensions.Configuration;
using Stripe;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public PaymentService(ICartRepository cartRepository, IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _cartRepository = cartRepository;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }
        public async Task<CustomerCart> CreateOrUpdatePaymentIntent(string cartId)
        {
            StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

            var cart = await _cartRepository.GetCartAsync(cartId);

            if (cart == null) return null;

            var shippingPrice = 0m;

            if (cart.DeliveryId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.Repository<Delivery>().GetByIdAsync((int)cart.DeliveryId);
                shippingPrice = deliveryMethod.Price;
            }

            foreach(var item in cart.Items)
            {
                var productItem = await _unitOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.Id);

                if (productItem.IsOnSale)
                {
                    if (item.Price != productItem.GetSalePrice())
                    {
                        item.Price = productItem.GetSalePrice();
                    }
                } 
                else
                {
                    if (item.Price != productItem.Price)
                    {
                        item.Price = productItem.Price;
                    }
                }

                var service = new PaymentIntentService();

                PaymentIntent intent;

                if (string.IsNullOrEmpty(cart.PaymentIntentId))
                {
                    var options = new PaymentIntentCreateOptions
                    {
                        Amount = (long)cart.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
                        Currency = "usd",
                        PaymentMethodTypes = new List<string> {"card"}
                    };

                    intent = await service.CreateAsync(options);
                    cart.PaymentIntentId = intent.Id;
                    cart.ClientSecret = intent.ClientSecret;
                }
                else
                {
                    var options = new PaymentIntentUpdateOptions
                    {
                        Amount = (long)cart.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100
                    };

                    await service.UpdateAsync(cart.PaymentIntentId, options);
                }

                await _cartRepository.UpdateCartAsync(cart);

                return cart;
            }
            return cart;
        }

        public async Task<Core.Entities.Order.Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderIntentId(paymentIntentId);
            var order = await _unitOfWork.Repository<Core.Entities.Order.Order>().GetEntityWithSpec(spec);

            if (order == null) return null;

            order.Status = OrderStatus.PaymentFailed;

            await _unitOfWork.Complete();

            return order;

        }

        public async Task<Core.Entities.Order.Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
            var spec = new OrderIntentId(paymentIntentId);
            var order = await _unitOfWork.Repository<Core.Entities.Order.Order>().GetEntityWithSpec(spec);

            if (order == null) return null;

            order.Status = OrderStatus.PaymentRecived;
            _unitOfWork.Repository<Core.Entities.Order.Order>().Update(order);

            await _unitOfWork.Complete();

            return order;
        }
    }
}
