using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class UsersCourse
    {
        [Key]
        public Guid? Id { get; set; }
        public Guid? UserId { get; set; }
        public Guid? CourseId { get; set; }
    }
}
