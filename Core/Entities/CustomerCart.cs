﻿using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerCart
    {
        public CustomerCart()
        {

        }
        public CustomerCart(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
        public int? DeliveryId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
