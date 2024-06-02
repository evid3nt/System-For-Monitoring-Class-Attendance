using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class Classroom
    {
        [Key]
        public Guid? Id { get; set; }
        public string? ClassroomName { get; set; }
    }
}
