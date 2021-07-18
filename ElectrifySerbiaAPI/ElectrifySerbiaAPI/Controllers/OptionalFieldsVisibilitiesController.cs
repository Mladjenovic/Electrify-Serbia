using Database.Models;
using Domain.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectrifySerbiaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptionalFieldsVisibilitiesController : ControllerBase
    {
        private readonly EfContext _context;

        public OptionalFieldsVisibilitiesController(EfContext context)
        {
            _context = context;
        }

        // GET: api/OptionalFieldsVisibilities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OptionalFieldsVisibility>>> GetOptionalFieldsVisibilities()
        {
            return await _context.OptionalFieldsVisibilities.ToListAsync();
        }

        // GET: api/OptionalFieldsVisibilities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OptionalFieldsVisibility>> GetOptionalFieldsVisibility(int id)
        {
            var optionalFieldsVisibility = await _context.OptionalFieldsVisibilities.FindAsync(id);

            if (optionalFieldsVisibility == null)
            {
                return NotFound();
            }

            return optionalFieldsVisibility;
        }

        // PUT: api/OptionalFieldsVisibilities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOptionalFieldsVisibility(int id, OptionalFieldsVisibility optionalFieldsVisibility)
        {
            if (id != optionalFieldsVisibility.Id)
            {
                return BadRequest();
            }

            _context.Entry(optionalFieldsVisibility).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OptionalFieldsVisibilityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OptionalFieldsVisibilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OptionalFieldsVisibility>> PostOptionalFieldsVisibility(OptionalFieldsVisibility optionalFieldsVisibility)
        {
            _context.OptionalFieldsVisibilities.Add(optionalFieldsVisibility);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOptionalFieldsVisibility", new { id = optionalFieldsVisibility.Id }, optionalFieldsVisibility);
        }

        // DELETE: api/OptionalFieldsVisibilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOptionalFieldsVisibility(int id)
        {
            var optionalFieldsVisibility = await _context.OptionalFieldsVisibilities.FindAsync(id);
            if (optionalFieldsVisibility == null)
            {
                return NotFound();
            }

            _context.OptionalFieldsVisibilities.Remove(optionalFieldsVisibility);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OptionalFieldsVisibilityExists(int id)
        {
            return _context.OptionalFieldsVisibilities.Any(e => e.Id == id);
        }
    }
}
