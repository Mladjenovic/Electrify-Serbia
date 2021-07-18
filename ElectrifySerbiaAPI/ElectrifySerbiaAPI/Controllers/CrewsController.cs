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
    public class CrewsController : ControllerBase
    {
        private readonly EfContext context;

        public CrewsController(EfContext context)
        {
            this.context = context;
        }

        // GET: api/Crews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Crew>>> GetCrews()
        {
            context.Crews.Include(item => item.Members).ToList();
            var c = await context.Crews.ToListAsync();

            return c;
        }

        // GET: api/Crews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Crew>> GetCrew(int id)
        {
            var crew = await context.Crews.FindAsync(id);

            if (crew == null)
                return NotFound();

            return crew;
        }

        // PUT: api/Crews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrew(int id, Crew crew)
        {
            if (id != crew.Id)
                return BadRequest();

            _ = context.Crews.Include(item => item.Members).ToList();

            Crew find = await context.Crews.FindAsync(id);
            find.Name = crew.Name;
            List<TeamMember> members = new List<TeamMember>(find.Members);

            // Clear members
            foreach (var item in members)
            {
                find.Members.Remove(item);
            }

            foreach (var item in crew.Members)
            {
                item.Id = 0;
                find.Members.Add(item);
            }

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrewExists(id))
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

        // POST: api/Crews
        [HttpPost]
        public async Task<ActionResult<Crew>> PostCrew(Crew crew)
        {
            context.Crews.Add(crew);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetCrew", new { id = crew.Id }, crew);
        }

        // DELETE: api/Crews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrew(int id)
        {
            _ = context.Crews.Include(item => item.Members).ToList();
            var crew = await context.Crews.FindAsync(id);

            if (crew == null)
                return NotFound();

            context.Crews.Remove(crew);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool CrewExists(int id)
        {
            return context.Crews.Any(e => e.Id == id);
        }

    }
}
