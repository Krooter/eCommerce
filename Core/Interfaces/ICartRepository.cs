using Core.Entities;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICartRepository
    {
        Task<CustomerCart> GetCartAsync(string cardId);

        Task<CustomerCart> UpdateCartAsync(CustomerCart card);
        Task<bool> DeleteCartAsync(string cardId);
    }
}
