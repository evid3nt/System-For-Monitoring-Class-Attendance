using System;
using System.Collections.Generic;

namespace be_evid3nt.Models
{
    public partial class Telemetry
    {
        public Guid Id { get; set; }
        public DateTime ScanTime { get; set; }
        public Guid UserId { get; set; }
        public Guid ClassroomId { get; set; }

        public virtual Classroom Classroom { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
