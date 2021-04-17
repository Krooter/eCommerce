using API.DTOs;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class PhotoUrlResolver : IValueResolver<Photo, PhotoDTO, string>
    {
        private readonly IConfiguration _config;

        public PhotoUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Photo source, PhotoDTO destination, string destMember, ResolutionContext context)
        {
            return null;
        }
    }
}

