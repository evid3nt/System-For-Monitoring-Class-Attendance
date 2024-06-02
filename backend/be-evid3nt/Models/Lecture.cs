using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class Lecture
    {
        [Key]
        public Guid? Id { get; set; }
        public DateTime? LectureStart { get; set; }
        public DateTime? LectureEnd { get; set; }
        public Guid? CourseId { get; set; }
        public Guid? ClassroomId { get; set; }
    }
}
