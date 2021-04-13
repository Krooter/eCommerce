using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Users
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}
