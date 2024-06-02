using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class Course
    {
        [Key]
        public Guid? Id { get; set; }
        public string? CourseName { get; set; }
    }
}
