using be_evid3nt.Data;
using be_evid3nt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data.SqlClient;

namespace be_evid3nt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelemetryController : ControllerBase
    {
        private readonly EvidentContext _context;

        public TelemetryController(EvidentContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Telemetry>>> GetTelemetrys()
        {
            return await _context.Telemetrys.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Telemetry>> GetTelemetry(Guid id)
        {
            var telemetry = await _context.Telemetrys.FindAsync(id);

            if (telemetry == null)
            {
                return NotFound();
            }

            return telemetry;
        }

        [HttpGet("telemetrys/{userId}")]
        public async Task<List<AttendanceResult>> GetStudentAttendanceAsync(Guid userId)
        {
            var query = @"
            SELECT 
                ""CourseName"",
                ""LectureStart"",
                ""LectureEnd"",
                ""ClassroomName"",
                SUM(CASE
                    WHEN (
                            ""ScanIn"".""ScanTime"" BETWEEN ""LectureStart"" - INTERVAL '15 min' AND ""LectureStart"" + INTERVAL '15 min'
                        ) AND (
                            ""ScanOut"".""ScanTime"" BETWEEN ""LectureEnd"" - INTERVAL '15 min' AND ""LectureEnd"" + INTERVAL '15 min'
                        ) THEN 1
                    ELSE 0
                END) AS ""Attendance""
            FROM ""Users""
            JOIN ""UsersCourses"" ON ""Users"".""Id"" = ""UsersCourses"".""UserId"" AND ""Users"".""Id"" = @UserId
            JOIN ""Courses"" ON ""UsersCourses"".""CourseId"" = ""Courses"".""Id""
            JOIN ""Lectures"" ON ""Courses"".""Id"" = ""Lectures"".""CourseId""
            JOIN ""Classrooms"" ON ""Lectures"".""ClassroomId"" = ""Classrooms"".""Id""
            LEFT OUTER JOIN ""Telemetrys"" AS ""ScanIn"" ON ""Classrooms"".""Id"" = ""ScanIn"".""ClassroomId"" AND ""ScanIn"".""UserId"" = @UserId
            LEFT OUTER JOIN ""Telemetrys"" AS ""ScanOut"" ON ""Classrooms"".""Id"" = ""ScanOut"".""ClassroomId"" AND ""ScanOut"".""UserId"" = @UserId
            GROUP BY ""CourseName"", ""LectureStart"", ""LectureEnd"", ""ClassroomName""
            ORDER BY ""LectureStart"" DESC
            OFFSET 0
            LIMIT 10;";

            var attendanceResults = new List<AttendanceResult>();

            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = System.Data.CommandType.Text;
                command.Parameters.Add(new NpgsqlParameter("@UserId", userId));

                _context.Database.OpenConnection();

                using (var result = await command.ExecuteReaderAsync())
                {
                    while (await result.ReadAsync())
                    {
                        attendanceResults.Add(new AttendanceResult
                        {
                            CourseName = result.GetString(0),
                            LectureStart = result.GetDateTime(1),
                            LectureEnd = result.GetDateTime(2),
                            ClassroomName = result.GetString(3),
                            Attendance = result.GetInt32(4)
                        });
                    }
                }

                _context.Database.CloseConnection();
            }

            return attendanceResults;
        }

        [HttpPost]
        public async Task<ActionResult<Telemetry>> PostTelemetry(Telemetry telemetry)
        {
            telemetry.Id = Guid.NewGuid();

            _context.Telemetrys.Add(telemetry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTelemetry), new { id = telemetry.Id }, telemetry);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTelemetry(Guid id, Telemetry telemetry)
        {
            var existingTelemetry = await _context.Telemetrys.FindAsync(id);
            if (existingTelemetry == null)
            {
                return NotFound();
            }

            if (telemetry.ScanTime == null)
            {
                existingTelemetry.ScanTime = telemetry.ScanTime;
            }
            if (telemetry.UserId == null)
            {
                existingTelemetry.UserId = telemetry.UserId;
            }
            if (telemetry.ClassroomId == null)
            {
                existingTelemetry.ClassroomId = telemetry.ClassroomId;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TelemetryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingTelemetry);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTelemetry(Guid id)
        {
            var telemetry = await _context.Telemetrys.FindAsync(id);
            if (telemetry == null)
            {
                return NotFound();
            }

            _context.Telemetrys.Remove(telemetry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TelemetryExists(Guid id)
        {
            return _context.Lectures.Any(e => e.Id == id);
        }
    }
}
