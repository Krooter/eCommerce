using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ICartRepository _Cart;

        public CartController(ICartRepository Cart)
        {
            _Cart = Cart;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetCartById(string id)
        {
            var Cart = await _Cart.GetCartAsync(id);

            return Ok(Cart ?? new CustomerCart(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCart>> UpdateBasket(CustomerCart Cart)
        {
            var updatedCart = await _Cart.UpdateCartAsync(Cart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _Cart.DeleteCartAsync(id);
        }
    }
}
