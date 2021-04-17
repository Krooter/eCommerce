using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Received")]
        PaymentRecived,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed,
        [EnumMember(Value = "Product Shipped")]
        Shipped,
        [EnumMember(Value = "Product on currier")]
        Currier,
        [EnumMember(Value = "Completed")]
        Completed
    }
}
