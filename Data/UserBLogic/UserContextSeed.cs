using Core.Entities.Users;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.UserBLogic.Seed
{
    public class UserContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Cristian",
                    Email = "cristian@gmail.com",
                    UserName = "Cristian",
                    Address = new Address
                    {
                        FirstName = "Cristian",
                        LastName = "Voroneanu",
                        Street = "Gh. Asachi",
                        City = "Chisinau",
                        State = "Chisinau",
                        ZipCode = "MD-2028"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$word123");
            }
        }
    }
}
