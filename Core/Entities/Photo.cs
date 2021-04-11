using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class Photo : BaseEntity
    {
        public string PhotoUrl1 { get; set; }
        public string PhotoUrl2 { get; set; }
        public string PhotoUrl3 { get; set; }
        public string PhotoUrl4 { get; set; }
        public string PhotoUrl5 { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}