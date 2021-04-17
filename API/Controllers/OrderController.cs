using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var address = _mapper.Map<AddressDTO, Address>(orderDTO.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDTO.DeliveryId, orderDTO.CartId, address);

            if(order == null)
            {
                return BadRequest(new ApiResponse(400, "Problem creating order!"));
            }

            return Ok(order);
        }
    }
}
