using be_evid3nt.Data;
using be_evid3nt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_evid3nt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelemetryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public TelemetryController(MyDbContext context)
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
