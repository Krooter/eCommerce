using Core.Entities;
using System;
using System.Linq.Expressions;

namespace Core.Specification
{
    public class ProductsBrandTypeCategorySpecification : BaseSpecification<Product>
    {
        public ProductsBrandTypeCategorySpecification(ProductSpecParams productParams)
            : base(x => (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) && 
                        (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId)
                            && (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
                                && (!productParams.CategoryId.HasValue || x.ProductCategoryId == productParams.CategoryId))
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductCategory);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsBrandTypeCategorySpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductCategory);
        }
    }
}
