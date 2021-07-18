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
using System.Net;
using System.Threading.Tasks;

namespace ElectrifySerbiaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentsController : ControllerBase
    {
        private readonly EfContext context;

        public IncidentsController(EfContext context)
        {
            this.context = context;
        }

        // GET: api/Incidents
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Incident>>> GetIncidents()
        {
            context.Incidents.Include(item => item.Call).ToList();
            context.Incidents.Include(item => item.Elements).ToList();
            context.Incidents.Include(item => item.Resolutions).ToList();
            context.Incidents.Include(item => item.Multimedia).ToList();
            foreach (var item in context.Incidents)
            {
                context.Entry(item).Reference(item => item.Crew).Load();
            }
            return await context.Incidents.ToListAsync();
        }

        // GET: api/Incidents/id
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            context.Incidents.Include(item => item.Call).ToList();
            context.Incidents.Include(item => item.Elements).ToList();
            context.Incidents.Include(item => item.Resolutions).ToList();
            context.Incidents.Include(item => item.Multimedia).ToList();


            var incident = await context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }
            context.Entry(incident).Reference(item => item.Crew).Load();
            return incident;
        }

        [HttpGet("{id}/version")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<int>> GetVersion(int id)
        {
            var element = await context.Incidents.FindAsync(id);

            if (element == null)
            {
                return NotFound();
            }

            return element.Version;
        }

        // PUT: api/Incidents/id
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutIncident(int id, Incident incident)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Dispatcher")
            {

                if (id != incident.Id)
                {
                    return BadRequest();
                }
                incident.Version++;
                context.Entry(incident).State = EntityState.Modified;

                try
                {
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IncidentExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return NoContent();
        }

        // POST: api/Incidents
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Incident>> PostIncident(Incident incident)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Dispatcher")
            {

                incident.Crew = null;
                context.Incidents.Add(incident);
                await context.SaveChangesAsync();

                return CreatedAtAction("GetIncident", new { id = incident.Id }, incident);
            }
            return NoContent();
        }

        [HttpPost("{id}/devices")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostIncidentElement(int id, IncidentElement element)
        {
            context.Incidents.Include(item => item.Elements).ToList();
            var incident = await context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }
            element.key = 0;
            incident.Elements.Add(element);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/calls")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostIncidentCall(int id, IncidentCall call)
        {
            context.Incidents.Include(item => item.Call).ToList();
            var incident = await context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }
            call.Key = 0;
            incident.Call.Add(call);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/resolutions")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<int>> PostIncidentResolution(int id, IncidentResolution resolution)
        {
            context.Incidents.Include(item => item.Resolutions).ToList();
            var incident = await context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return 0;
            }
            resolution.Id = 0;
            incident.Resolutions.Add(resolution);
            await context.SaveChangesAsync();
            return resolution.Id;
        }

        [HttpPost("{id}/crew")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostIncidentCrew(int id, Crew crew)
        {
            var incident = await context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }
            incident.Crew = crew;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/multimedia"), DisableRequestSizeLimit]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Multimedia>> PostIncidentMultimedia(int id, Multimedia multimedia)
        {
            string userid = User.Claims.First(x => x.Type == "UserID").Value;
            string role = User.Claims.First(x => x.Type == "Roles").Value;

            context.Incidents.Include(item => item.Multimedia).ToList();

            var incident = await context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }
            multimedia.Id = 0;
            incident.Multimedia.Add(multimedia);
            await context.SaveChangesAsync();
            return multimedia;
        }

        // DELETE: api/Incidents/id
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Dispatcher")
            {

                context.Incidents.Include(item => item.Call).ToList();
                context.Incidents.Include(item => item.Elements).ToList();
                context.Incidents.Include(item => item.Resolutions).ToList();
                context.Incidents.Include(item => item.Multimedia).ToList();
                foreach (var item in context.Incidents)
                {
                    context.Entry(item).Reference(item => item.Crew).Load();
                }
                var incident = await context.Incidents.FindAsync(id);
                if (incident == null)
                {
                    return NotFound();
                }

                context.Incidents.Remove(incident);
                await context.SaveChangesAsync();
            }
            return NoContent();
        }
        [HttpDelete("{id}/{elementId}/devices")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteIncidentElement(int id, int elementId)
        {
            context.Incidents.Include(item => item.Elements).ToList();
            var incident = await context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }
            IncidentElement element = incident.Elements.Where(item => item.Id == elementId).FirstOrDefault();
            incident.Elements.Remove(element);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}/{callId}/calls")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteIncidentCall(int id, int callId)
        {
            context.Incidents.Include(item => item.Call).ToList();
            var incident = await context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }
            IncidentCall call = incident.Call.Where(item => item.Id == callId).FirstOrDefault();
            incident.Call.Remove(call);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}/{resolutionId}/resolutions")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteIncidentResolution(int id, int resolutionId)
        {
            context.Incidents.Include(item => item.Resolutions).ToList();
            var incident = await context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }
            IncidentResolution resolution = incident.Resolutions.Where(item => item.Id == resolutionId).FirstOrDefault();
            incident.Resolutions.Remove(resolution);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}/{multimediaId}/multimedia")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteIncidentMultimedia(int id, int multimediaId)
        {
            context.Incidents.Include(item => item.Multimedia).ToList();
            var incident = await context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }
            Multimedia m = incident.Multimedia.Where(item => item.Id == multimediaId).FirstOrDefault();
            incident.Multimedia.Remove(m);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool IncidentExists(int id)
        {
            return context.Incidents.Any(e => e.Id == id);
        }
    }
}
