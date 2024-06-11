using be_evid3nt.Data;
using be_evid3nt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_evid3nt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersCourseController : ControllerBase
    {
        private readonly EvidentContext _context;

        public UsersCourseController(EvidentContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersCourse>>> GetUsersCourses()
        {
            return await _context.UsersCourses.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsersCourse>> GetUsersCourse(Guid id)
        {
            var usersCourse = await _context.UsersCourses.FindAsync(id);

            if (usersCourse == null)
            {
                return NotFound();
            }

            return usersCourse;
        }

        [HttpPost]
        public async Task<ActionResult<UsersCourse>> PostUsersCourse(UsersCourse usersCourse)
        {
            usersCourse.Id = Guid.NewGuid();

            _context.UsersCourses.Add(usersCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsersCourse), new { id = usersCourse.Id }, usersCourse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersCourse(Guid id, UsersCourse usersCourse)
        {
            var existingUsersCourse = await _context.UsersCourses.FindAsync(id);
            if (existingUsersCourse == null)
            {
                return NotFound();
            }

            if (usersCourse.CourseId == null)
            {
                existingUsersCourse.CourseId = usersCourse.CourseId;
            }
            if (usersCourse.UserId == null)
            {
                existingUsersCourse.UserId = usersCourse.UserId;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersCourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingUsersCourse);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsersCourse(Guid id)
        {
            var usersCourse = await _context.UsersCourses.FindAsync(id);
            if (usersCourse == null)
            {
                return NotFound();
            }

            _context.UsersCourses.Remove(usersCourse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersCourseExists(Guid id)
        {
            return _context.Lectures.Any(e => e.Id == id);
        }
    }
}
