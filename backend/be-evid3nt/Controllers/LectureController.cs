using be_evid3nt.Data;
using be_evid3nt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_evid3nt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : ControllerBase
    {
        private readonly MyDbContext _context;

        public LectureController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLectures()
        {
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
        public async Task<IActionResult> DeleteLecture(Guid id)
        {
            var lecture = await _context.Lectures.FindAsync(id);
            if (lecture == null)
            {
                return NotFound();
            }

            _context.Lectures.Remove(lecture);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LectureExists(Guid id)
        {
            return _context.Lectures.Any(e => e.Id == id);
        }
    }
}
