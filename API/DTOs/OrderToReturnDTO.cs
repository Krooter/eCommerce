﻿using Core.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderToReturnDTO
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public Address ShipToAddress { get; set; }
        public string Delivery { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDTO> OrderItems { get; set; }
        public decimal SalePrice { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
    }
}
