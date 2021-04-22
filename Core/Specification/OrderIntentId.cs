using Core.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class OrderIntentId : BaseSpecification<Order>
    {
        public OrderIntentId(string paymentIntentId) : base(o => o.PaymentIntentId == paymentIntentId)
        {
        }

     
    }
}
