using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Users;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Photo, PhotoDTO>();
            CreateMap<Product, ProductDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.ProductCategory, o => o.MapFrom(s => s.ProductCategory.Name));

            CreateMap<Address, AddressDTO>().ReverseMap();
            CreateMap<AddressDTO, Core.Entities.Order.Address>();
            CreateMap<CustomerCartDTO, CustomerCart>();
            CreateMap<CartItemDTO, CartItem>();
        }
    }
}
