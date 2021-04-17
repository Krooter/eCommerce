using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Order;
using Core.Entities.Users;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Photo, PhotoDTO>();
                //.ForMember(d => d.PhotoUrl1, o => o.MapFrom<PhotoUrlResolver>());

            CreateMap<Product, ProductDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.ProductCategory, o => o.MapFrom(s => s.ProductCategory.Name));

            CreateMap<Core.Entities.Users.Address, AddressDTO>().ReverseMap();

            CreateMap<AddressDTO, Core.Entities.Order.Address>();

            CreateMap<CustomerCartDTO, CustomerCart>();

            CreateMap<CartItemDTO, CartItem>();

            CreateMap<Order, OrderToReturnDTO>()
                .ForMember(d => d.Delivery, o => o.MapFrom(s => s.Delivery.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.Delivery.Price));

            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl));
        }
    }
}
