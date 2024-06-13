using System;
using System.Collections.Generic;

namespace be_evid3nt.Models
{
    public class AttendanceResult
    {
        public string CourseName { get; set; }
        public DateTime LectureStart { get; set; }
        public DateTime LectureEnd { get; set; }
        public string ClassroomName { get; set; }
        public int Attendance { get; set; }
    }
}
