using System;
using System.Collections.Generic;

namespace be_evid3nt.Models
{
    public partial class UsersCourse
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public Guid? CourseId { get; set; }
        public virtual User? User { get; set; }
    }
}
