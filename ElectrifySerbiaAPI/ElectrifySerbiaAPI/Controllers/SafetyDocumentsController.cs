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
    public class SafetyDocumentsController : ControllerBase
    {
        private readonly EfContext context;

        public SafetyDocumentsController(EfContext context)
        {
            this.context = context;
        }

        // GET api/SafetyDocuments
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<SafetyDocument>>> GetSafetyDocuments()
        {
            _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
            _ = context.SafetyDocuments.Include(item => item.History).ToList();
            _ = context.SafetyDocuments.Include(item => item.Multimedia).ToList();
            return await context.SafetyDocuments.ToListAsync();
        }

        // GET: api/SafetyDocuments/{id}
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<SafetyDocument>> GetSafetyDocument(int id)
        {
            _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
            _ = context.SafetyDocuments.Include(item => item.History).ToList();
            _ = context.SafetyDocuments.Include(item => item.Multimedia).ToList();
            var safetyDocument = await context.SafetyDocuments.FindAsync(id);

            if (safetyDocument == null)
                return NotFound();

            return safetyDocument;
        }

        // PUT api/SafetyDocuments/{id}
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutSafetyDocument(int id, SafetyDocument safetyDocument)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Dispatcher")
            {
                if (id != safetyDocument.Id)
                    return BadRequest();

                safetyDocument.Version++;
                context.Entry(safetyDocument).State = EntityState.Modified;

                try
                {
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SafetyDocumentExists(id))
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

        // POST api/SafetyDocuments
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<SafetyDocument>> PostSafetyDocument(SafetyDocument safetyDocument)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Dispatcher")
            {
                context.SafetyDocuments.Add(safetyDocument);
                await context.SaveChangesAsync();

                return CreatedAtAction("GetSafetyDocument", new { id = safetyDocument.Id }, safetyDocument);
            }
            return NoContent();
        }

        [HttpGet("{id}/version")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<int>> GetVersion(int id)
        {
            var element = await context.SafetyDocuments.FindAsync(id);

            if (element == null)
                return NotFound();

            return element.Version;
        }

        // DELETE: api/SafetyDocuments/{id}
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteSafetyDocument(int id)
        {
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            if (role == "Dispatcher")
            {
                _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
                _ = context.SafetyDocuments.Include(item => item.History).ToList();
                _ = context.SafetyDocuments.Include(item => item.Multimedia).ToList();

                var safetyDocument = await context.SafetyDocuments.FindAsync(id);

                if (safetyDocument == null)
                    return NotFound();

                context.SafetyDocuments.Remove(safetyDocument);
                await context.SaveChangesAsync();
            }

            return NoContent();
        }

        // POST api/SafetyDocuments/{id}/devices
        [HttpPost("{id}/devices")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostSafetyDocumentElement(int id, IncidentElement element)
        {
            _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
            var doc = await context.SafetyDocuments.FindAsync(id);

            if (doc == null)
                return NotFound();

            element.key = 0;
            doc.Elements.Add(element);
            await context.SaveChangesAsync();

            return NoContent();
        }

        // POST api/SafetyDocuments/{id}/history
        [HttpPost("{id}/history")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<HistoryInfo>> PostSafetyDocumentHistory(int id, HistoryInfo history)
        {
            _ = context.SafetyDocuments.Include(item => item.History).ToList();
            var doc = await context.SafetyDocuments.FindAsync(id);

            if (doc == null)
                return NotFound();

            history.Id = 0;
            history.Date = DateTime.Now.ToString("dd/MM/yyyy");

            if (history.State == "Approved")
                doc.State = "Approved";

            else if (history.State == "Canceled")
                doc.State = "Canceled";

            doc.History.Add(history);
            await context.SaveChangesAsync();

            return history;
        }

        // POST api/SafetyDocuments/{id}/multimedia
        [HttpPost("{id}/multimedia"), DisableRequestSizeLimit]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Multimedia>> PostSafetyDocumentMultimedia(int id, Multimedia multimedia)
        {
            string userid = User.Claims.First(x => x.Type == "UserID").Value;
            string role = User.Claims.First(x => x.Type == "Roles").Value;

            _ = context.SafetyDocuments.Include(item => item.Multimedia).ToList();

            var doc = await context.SafetyDocuments.FindAsync(id);

            if (doc == null)
                return NotFound();

            multimedia.Id = 0;
            doc.Multimedia.Add(multimedia);
            await context.SaveChangesAsync();
            return multimedia;
        }

        [HttpDelete("{id}/{elementId}/devices")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteSafetyDocumentElement(int id, int elementId)
        {
            _ = context.SafetyDocuments.Include(item => item.Elements).ToList();
            var doc = await context.SafetyDocuments.FindAsync(id);

            if (doc == null)
                return NotFound();

            IncidentElement element = doc.Elements.Where(item => item.Id == elementId).FirstOrDefault();
            doc.Elements.Remove(element);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}/{multimediaId}/multimedia")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteIncidentMultimedia(int id, int multimediaId)
        {
            _ = context.SafetyDocuments.Include(item => item.Multimedia).ToList();
            var doc = await context.SafetyDocuments.FindAsync(id);

            if (doc == null)
                return NotFound();

            Multimedia m = doc.Multimedia.Where(item => item.Id == multimediaId).FirstOrDefault();
            doc.Multimedia.Remove(m);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool SafetyDocumentExists(int id)
        {
            return context.SafetyDocuments.Any(e => e.Id == id);
        }
    }
}
