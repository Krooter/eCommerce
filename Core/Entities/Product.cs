using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int ProductBrandId { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public int ProductCategoryId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
        public decimal Discount { get; set; } 
        public bool IsOnSale { get; set; } = false;
        public ICollection<Photo> Photo { get; set; }

        public decimal GetSalePrice()
        {
            return this.Price - ((this.Price * this.Discount) / 100);
        }
    }
}
