﻿using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICartRepository _cartRepo;
        private readonly IPaymentService _paymentService;

        public OrderService(IUnitOfWork unitOfWork, ICartRepository cartRepo, IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _cartRepo = cartRepo;
            _paymentService = paymentService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryId, string cartId, Address shippingAddress)
        {
            //get cart from repo
            var cart = await _cartRepo.GetCartAsync(cartId);
            decimal subtotal = 0;
            //get items from product repo
            var items = new List<OrderItem>();
            foreach(var item in cart.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var photo = await _unitOfWork.Repository<Photo>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, photo.PhotoUrl1);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity, item.SalePrice);
                items.Add(orderItem);

                //calc subtotal
                if (item.IsOnSale)
                {
                    subtotal = items.Sum(item => item.SalePrice * item.Quantity);
                }
                if (!item.IsOnSale)
                {
                    subtotal = items.Sum(item => item.Price * item.Quantity);
                }
            }
            
            //get delivery from repo
            var delivery = await _unitOfWork.Repository<Delivery>().GetByIdAsync(deliveryId);

            //check if order exist
            var spec = new OrderIntentId(cart.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if(existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(cart.PaymentIntentId);
            }

            //create order
            var order = new Order(items, buyerEmail, shippingAddress, delivery, subtotal, cart.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            //save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            //return order
            return order;
        }

        public async Task<IReadOnlyList<Delivery>> GetDeliveryAsync()
        {
            return await _unitOfWork.Repository<Delivery>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrderItemsSpecification(id, buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersAsync(string buyerEmail)
        {
            var spec = new OrderItemsSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}
