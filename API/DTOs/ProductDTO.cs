using Core.Entities;
using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int ProductTypeId { get; set; }
        public string ProductType { get; set; }
        public int ProductBrandId { get; set; }
        public string ProductBrand { get; set; }
        public int ProductCategoryId { get; set; }
        public string ProductCategory { get; set; }
        public DateTime DateAdded { get; set; }
        public ICollection<PhotoDTO> Photo { get; set; }
    }
}
