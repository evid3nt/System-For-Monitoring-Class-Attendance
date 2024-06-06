using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class User
    {
        [Key]
        public Guid? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? CardId { get; set; }
        public UserRole? UserRole { get; set; }
    }
}
