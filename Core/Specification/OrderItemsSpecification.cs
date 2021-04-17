using Core.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class OrderItemsSpecification : BaseSpecification<Order>
    {
        public OrderItemsSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.Delivery);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrderItemsSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.Delivery);
        }
    }
}
