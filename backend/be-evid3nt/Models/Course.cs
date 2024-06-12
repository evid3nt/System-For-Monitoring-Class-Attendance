using System;
using System.Collections.Generic;

namespace be_evid3nt.Models
{
    public partial class Course
    {
        public Guid Id { get; set; }
        public string CourseName { get; set; } = null!;
        public ICollection<UsersCourse> UserCourses { get; set; }
    }
}
