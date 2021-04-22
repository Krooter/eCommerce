using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

                if(item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
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
    }
}
