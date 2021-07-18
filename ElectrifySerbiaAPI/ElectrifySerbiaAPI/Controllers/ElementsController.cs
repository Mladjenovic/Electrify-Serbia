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
    public class ElementsController : ControllerBase
    {
        private readonly EfContext context;

        public ElementsController(EfContext context)
        {
            this.context = context;
        }

        // GET api/Elements
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Element>>> GetElements()
        {
            return await context.Elements.ToListAsync();
        }

        // GET api/Elements/{id}
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Element>> GetElement(int id)
        {
            var element = await context.Elements.FindAsync(id);

            if (element == null)
            {
                return NotFound();
            }

            return element;
        }

        // Returns the version of the element
        [HttpGet("{id}/version")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<int>> GetVersion(int id)
        {
            var element = await context.Elements.FindAsync(id);

            if (element == null)
            {
                return NotFound();
            }

            return element.Version;
        }


        // PUT api/Emenents/{id}
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutElement(int id, Element element)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Administrator")
            {
                _ = context.Incidents.Include(item => item.Elements).ToList();
                _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
                if (id != element.Id)
                {
                    return BadRequest();
                }
                element.Version++;                                                  // The element changes, this becomes now a new version of the element
                context.Entry(element).State = EntityState.Modified;                // Changing the state to modified for db
            }

            try
            {
                element.Name = element.Type.Substring(0, 3) + element.Id.ToString();

                // Going through Incidents
                foreach (var item in context.Incidents)
                {
                    foreach (var el in item.Elements)
                    {
                        if (el.Id == id)
                        {
                            el.Name = element.Name;
                            el.Type = element.Type;
                            el.X = element.X;
                            el.Y = element.Y;
                        }
                    }
                }

                // Going through Safety Documents
                foreach (var item in context.SafetyDocuments)
                {
                    foreach (var el in item.Elements)
                    {
                        if (el.Id == id)
                        {
                            el.Name = element.Name;
                            el.Type = element.Type;
                            el.X = element.X;
                            el.Y = element.Y;
                        }
                    }
                }
                await context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElementExists(id))
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

        // POST api/Elements
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Element>> PostElement(Element element)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Administrator")
            {
                element.Version = 0;                // Cause we are adding a new element, zero is the initial version.
                context.Elements.Add(element);
                await context.SaveChangesAsync();
                element.Name = element.Type.Substring(0, 3) + element.Id.ToString();
                await context.SaveChangesAsync();
                return CreatedAtAction("GetElement", new { id = element.Id }, element);
            }

            return NoContent();
        }

        // DELETE api/Elements/{id}
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteElement(int id)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Administrator")
            {
                _ = context.Incidents.Include(item => item.Elements).ToList();
                _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
                var element = await context.Elements.FindAsync(id);

                if (element == null)
                {
                    return NotFound();
                }

                // Going through Incidents
                foreach (var item in context.Incidents)
                {
                    foreach (var el in item.Elements)
                    {
                        if (el.Id == id)
                        {
                            item.Elements.Remove(el);
                        }
                    }
                }

                // Going through Safety Documents
                foreach (var item in context.SafetyDocuments)
                {
                    foreach (var el in item.Elements)
                    {
                        if (el.Id == id)
                        {
                            item.Elements.Remove(el);
                        }
                    }
                }

                context.Elements.Remove(element);
                await context.SaveChangesAsync();

            }

            return NoContent();
        }

        private bool ElementExists(int id)
        {
            return context.Elements.Any(e => e.Id == id);
        }

    }
}
