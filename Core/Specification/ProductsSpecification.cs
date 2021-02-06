using Core.Entities;
using System;
using System.Linq.Expressions;

namespace Core.Specification
{
    public class ProductsBrandTypeCategorySpecification : BaseSpecification<Product>
    {
        public ProductsBrandTypeCategorySpecification()
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductCategory);
        }

        public ProductsBrandTypeCategorySpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductCategory);
        }
    }
}
