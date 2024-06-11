using System;
using System.Collections.Generic;

namespace be_evid3nt.Models
{
    public partial class User
    {
        public User()
        {
            Telemetries = new HashSet<Telemetry>();
            UsersCourses = new HashSet<UsersCourse>();
        }

        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? CardId { get; set; }
        public UserRole? UserRole { get; set; }

        public virtual ICollection<Telemetry> Telemetries { get; set; }
        public virtual ICollection<UsersCourse> UsersCourses { get; set; }
    }
}
