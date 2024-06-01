using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class User
    {
        [Key]
        public Guid? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public UserRole? UserRole { get; set; }
    }
}
