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
    public class StreetsController : ControllerBase
    {
        private readonly EfContext context;

        public StreetsController(EfContext context)
        {
            this.context = context;
        }


        // GET: api/Streets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Street>>> GetStreets()
        {
            return await context.Streets.ToListAsync();
        }

        // GET: api/Streets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Street>> GetStreet(int id)
        {
            var street = await context.Streets.FindAsync(id);

            if (street == null)
                return NotFound();

            return street;
        }

        // PUT: api/Streets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStreet(int id, Street street)
        {
            if (id != street.Id)
                return BadRequest();

            context.Entry(street).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StreetExists(id))
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

        // POST: api/Streets
        [HttpPost]
        public async Task<ActionResult<Street>> PostStreet(Street street)
        {
            context.Streets.Add(street);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetStreet", new { id = street.Id }, street);
        }

        // DELETE: api/Streets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStreet(int id)
        {
            var street = await context.Streets.FindAsync(id);

            if (street == null)
                return NotFound();

            context.Streets.Remove(street);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool StreetExists(int id)
        {
            return context.Streets.Any(e => e.Id == id);
        }

    }
}
