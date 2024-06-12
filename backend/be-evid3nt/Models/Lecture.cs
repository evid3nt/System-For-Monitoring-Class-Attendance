using System;
using System.Collections.Generic;

namespace be_evid3nt.Models
{
    public partial class Lecture
    {
        public Guid Id { get; set; }
        public DateTime? LectureStart { get; set; }
        public DateTime? LectureEnd { get; set; }
        public Guid? CourseId { get; set; }
        public Guid? ClassroomId { get; set; }

        public virtual Classroom? Classroom { get; set; }
        public virtual Course? Course { get; set; }
    }
}
