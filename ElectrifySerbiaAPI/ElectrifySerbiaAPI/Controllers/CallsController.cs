using Database.Models;
using Domain.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    public class CallsController : ControllerBase
    {
        private readonly EfContext context;

        public CallsController(EfContext context)
        {
            this.context = context;
        }

        // GET api/Calls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Call>>> GetCalls()
        {
            return await context.Calls.ToListAsync();
        }

        // GET api/Calls/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Call>> GetCall(int id)
        {
            var call = await context.Calls.FindAsync(id);

            if (call == null)
                return NotFound();

            return call;
        }

        // PUT: api/Calls/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCall(int id, Call call)
        {
            if (id != call.Id)
                return BadRequest();

            context.Entry(call).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CallExists(id))
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

        // POST api/Calls
        [HttpPost]
        public async Task<ActionResult<Call>> PostCall(Call call)
        {
            context.Calls.Add(call);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetCall", new { id = call.Id }, call);
        }

        // DELETE api/Calls/{id}
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteCall(int id)
        {
            _ = context.Incidents.Include(item => item.Call).ToList();

            var call = await context.Calls.FindAsync(id);

            if (call == null)
                return NotFound();


            foreach (var item in context.Incidents)
            {
                foreach (var c in item.Call)
                {
                    if (c.Id == id)
                    {
                        item.Call.Remove(c);
                    }
                }
            }

            context.Calls.Remove(call);
            await context.SaveChangesAsync();

            return NoContent();
        }


        private bool CallExists(int id)
        {
            return context.Calls.Any(e => e.Id == id);
        }

    }
}
