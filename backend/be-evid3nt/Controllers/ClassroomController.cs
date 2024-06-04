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
    public class ClassroomController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ClassroomController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Classroom>>> GetClassrooms()
        {
            return await _context.Classrooms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Classroom>> GetClassroom(Guid id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);

            if (classroom == null)
            {
                return NotFound();
            }

            return classroom;
        }

        [HttpPost]
        [Authorize(Policy = "TeacherOrAdmin")]
        public async Task<ActionResult<Classroom>> PostClassroom(Classroom classroom)
        {
            classroom.Id = Guid.NewGuid();

            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClassroom), new { id = classroom.Id }, classroom);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "TeacherOrAdmin")]
        public async Task<IActionResult> PutClassroom(Guid id, Classroom classroom)
        {

            var existingClassroom = await _context.Classrooms.FindAsync(id);
            if (existingClassroom == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(classroom.ClassroomName))
            {
                existingClassroom.ClassroomName = classroom.ClassroomName;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassroomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingClassroom);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "TeacherOrAdmin")]
        public async Task<IActionResult> DeleteClassroom(Guid id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }

            _context.Classrooms.Remove(classroom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassroomExists(Guid id)
        {
            return _context.Classrooms.Any(e => e.Id == id);
        }
    }
}
