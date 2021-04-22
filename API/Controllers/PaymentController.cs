﻿using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _payment;

        public PaymentController(IPaymentService payment)
        {
            _payment = payment;
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
    }
}