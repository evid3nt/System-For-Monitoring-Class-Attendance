using System.ComponentModel.DataAnnotations;

namespace be_evid3nt.Models
{
    public class Telemetry
    {
        [Key]
        public Guid? Id { get; set; }
        public DateTime? ScanTime { get; set; }
        public Guid? UserId { get; set; }
        public Guid? ClassroomId { get; set; }
    }
}
