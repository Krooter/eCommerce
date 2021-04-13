using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ICartRepository _Cart;
        private readonly IMapper _mapper;

        public CartController(ICartRepository Cart, IMapper mapper)
        {
            _Cart = Cart;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetCartById(string id)
        {
            var Cart = await _Cart.GetCartAsync(id);

            return Ok(Cart ?? new CustomerCart(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCart>> UpdateBasket(CustomerCartDTO cart)
        {
            var customerCart = _mapper.Map<CustomerCartDTO, CustomerCart>(cart);

            var updatedCart = await _Cart.UpdateCartAsync(customerCart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _Cart.DeleteCartAsync(id);
        }
    }
}
