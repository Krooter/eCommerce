using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stripe;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _payment;
        private readonly ILogger<PaymentController> _logger;
        private readonly string _WhSecret;

        public PaymentController(IPaymentService payment, ILogger<PaymentController> logger, IConfiguration configuration)
        {
            _payment = payment;
            _logger = logger;
            _WhSecret = configuration.GetSection("StripeSettings:WhSecret").Value;
        }

        [Authorize]
        [HttpPost("{cartId}")]
        public async Task<ActionResult<CustomerCart>> CreateOrUpdatePaymentIntent(string cartId)
        {
            var cart = await _payment.CreateOrUpdatePaymentIntent(cartId);

            if(cart == null)
            {
                return BadRequest(new ApiResponse(400, "Problem with your cart items!"));
            }

            return cart;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvents = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _WhSecret);

            PaymentIntent intent;

            Core.Entities.Order.Order order;

            switch (stripeEvents.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvents.Data.Object;
                    _logger.LogInformation("Payment Succeeded: ", intent.Id);
                    order = await _payment.UpdateOrderPaymentSucceeded(intent.Id);
                    _logger.LogInformation("Order Updated to payment received: ", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvents.Data.Object;
                    _logger.LogInformation("Payment Failed: ", intent.Id);
                    order = await _payment.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Payment Failed: ", order.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}
