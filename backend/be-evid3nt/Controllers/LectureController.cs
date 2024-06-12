using be_evid3nt.Data;
using be_evid3nt.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_evid3nt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : ControllerBase
    {
        private readonly EvidentContext _context;

        public LectureController(EvidentContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLectures()
        {
            // dodati filtriranje za lectures po useru
            return await _context.Lectures.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lecture>> GetLecture(Guid id)
        {
            var lecture = await _context.Lectures.FindAsync(id);

            if (lecture == null)
            {
                return NotFound();
            }

            return lecture;
        }

        [HttpGet("current/{userId}")]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLecturesForUser(Guid userId)
        {
            // Pronađi sve userCourses za određenog korisnika
            var userCourses = await _context.UsersCourses
                .Where(uc => uc.UserId == userId)
                .ToListAsync();

            if (userCourses == null || !userCourses.Any())
            {
                return NotFound("No userCourses found for the specified user.");
            }

            // Dohvati sve courseIds za korisnika
            var courseIds = userCourses.Select(uc => uc.CourseId).ToList();

            // Pronađi sve lekcije (lectures) koje pripadaju pronađenim courseIds
            var lectures = await _context.Lectures
                .Include(a => a.Classroom)
                .Include(b => b.Course)
                .Where(l => courseIds.Contains(l.CourseId))
                .OrderBy(c => c.LectureStart)
                .ToListAsync();

            if (lectures == null || !lectures.Any())
            {
                return NotFound("No lectures found for the specified user.");
            }

            return lectures;
        }


        [HttpPost]
        public async Task<ActionResult<Lecture>> PostLecture(Lecture lecture)
        {
            lecture.Id = Guid.NewGuid();

            _context.Lectures.Add(lecture);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLecture), new { id = lecture.Id }, lecture);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLecture(Guid id, Lecture lecture)
        {
            var existingLecture = await _context.Lectures.FindAsync(id);
            if (existingLecture == null)
            {
                return NotFound();
            }

            if (lecture.LectureStart == null)
            {
                existingLecture.LectureStart = lecture.LectureStart;
            }
            if (lecture.LectureEnd == null)
            {
                existingLecture.LectureEnd = lecture.LectureEnd;
            }
            if (lecture.CourseId == null)
            {
                existingLecture.CourseId = lecture.CourseId;
            }
            if (lecture.ClassroomId == null)
            {
                existingLecture.ClassroomId = lecture.ClassroomId;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LectureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingLecture);
        }

        [HttpDelete("{id}")]
        public async Task<Lecture> DeleteLecture(Guid id)
        {
            var lecture = await _context.Lectures.FindAsync(id);
         
            _context.Lectures.Remove(lecture);
            await _context.SaveChangesAsync();

            return lecture;
        }

        private bool LectureExists(Guid id)
        {
            return _context.Lectures.Any(e => e.Id == id);
        }
    }
}
