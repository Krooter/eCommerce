using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderDTO
    {
        public string CartId { get; set; }
        public int DeliveryId { get; set; }
        public AddressDTO ShipToAddress { get; set; }
    }
}
