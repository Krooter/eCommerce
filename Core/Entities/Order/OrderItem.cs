namespace Core.Entities.Order
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity, decimal salePrice)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
            SalePrice = salePrice;
        }

        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public decimal SalePrice { get; set; }
        public int Quantity { get; set; }
    }
}
