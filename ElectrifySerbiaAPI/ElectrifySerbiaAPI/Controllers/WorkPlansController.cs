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
    public class WorkPlansController : ControllerBase
    {
        private readonly EfContext _context;

        public WorkPlansController(EfContext context)
        {
            _context = context;
        }

        // GET: api/WorkPlans
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<WorkPlan>>> GetWorkPlans()
        {
            //_context.WorkPlan.Include(item => item.HistoryInfos).ToList();
            //_context.WorkPlan.Include(item => item.Multimedia).ToList();
            //_context.WorkPlan.Include(item => item.Equipment).ToList();
            //_context.WorkPlan.Include(item => item.Instructions).ToList();

            return await _context.WorkPlan.ToListAsync();
        }

        [HttpGet("{username}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<WorkPlan>>> GetWorkPlans(string username)
        {
            //_context.WorkPlan.Include(item => item.HistoryInfos).ToList();
            //_context.WorkPlan.Include(item => item.Multimedia).ToList();
            //_context.WorkPlan.Include(item => item.Equipment).ToList();
            //_context.WorkPlan.Include(item => item.Instructions).ToList();

            return await _context.WorkPlan.Where(x => x.Username == username).ToListAsync();
        }

        // GET: api/WorkPlans/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<WorkPlan>> GetWorkPlans(int id)
        {
            //_context.WorkPlan.Include(item => item.HistoryInfos).ToList();
            //_context.WorkPlan.Include(item => item.Multimedia).ToList();
            //_context.WorkPlan.Include(item => item.Equipment).ToList();
            //_context.WorkPlan.Include(item => item.Instructions).ToList();

            var workPlan = await _context.WorkPlan.FindAsync(id);
            if (workPlan == null)
            {
                return NotFound();
            }

            return workPlan;
        }


        // PUT: api/WorkPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutWorkPlan(int id, WorkPlan workPlan)
        {
            if (id != workPlan.Id)
            {
                return BadRequest();
            }

            _context.Entry(workPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkPlanExists(id))
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

        [HttpPut("{id}/{instructionId}/instructions")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutWorkPlan(int id, int instructionId, WorkPlan workPlan)
        {
            if (id != workPlan.Id)
            {
                return BadRequest();
            }

            //var instructions = await _context.WorkPlan.


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkPlanExists(id))
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

        // POST: api/WorkPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<WorkPlan>> PostWorkPlan(WorkPlan workPlan)
        {

            _context.WorkPlan.Add(workPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkPlan", new { id = workPlan.Id }, workPlan);
        }

        //[HttpPost("{id}/history")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> PostHistoryInfo(int id, HistoryInfo history)
        //{
        //    _context.WorkPlan.Include(item => item.HistoryInfos).ToList();
        //    var workplan = await _context.WorkPlan.FindAsync(id);

        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    //history.key = 0;
        //    workplan.HistoryInfos.Add(history);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //[HttpPost("{id}/equipment")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> PostWorkPlanElement(int id, WorkPlanElement element)
        //{
        //    _context.WorkPlan.Include(item => item.Equipment).ToList();
        //    var workplan = await _context.WorkPlan.FindAsync(id);

        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    element.key = 0;
        //    workplan.Equipment.Add(element);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //[HttpPost("{id}/multimedia"), DisableRequestSizeLimit]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<ActionResult<Multimedia>> PostWorkPlanMultimedia(int id, Multimedia multimedia)
        //{
        //    string userid = User.Claims.First(x => x.Type == "UserID").Value;
        //    string role = User.Claims.First(x => x.Type == "Roles").Value;

        //    _context.WorkPlan.Include(item => item.Multimedia).ToList();

        //    var workplan = await _context.WorkPlan.FindAsync(id);
        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    multimedia.Id = 0;
        //    workplan.Multimedia.Add(multimedia);
        //    await _context.SaveChangesAsync();
        //    return multimedia;
        //}

        //[HttpPost("{id}/instructions")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> PostWorkPlanInstruction(int id, WorkPlanInstruction instruction)
        //{
        //    _context.WorkPlan.Include(item => item.Instructions).ToList();
        //    var workplan = await _context.WorkPlan.FindAsync(id);

        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    workplan.Instructions.Add(instruction);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        // DELETE: api/WorkPlans/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteWorkPlan(int id)
        {
            var workPlan = await _context.WorkPlan.FindAsync(id);
            if (workPlan == null)
            {
                return NotFound();
            }

            _context.WorkPlan.Remove(workPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //[HttpDelete("{id}/{elementId}/equipment")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> DeleteWorkPlanElement(int id, int elementId)
        //{
        //    _context.WorkPlan.Include(item => item.Equipment).ToList();
        //    var workplan = await _context.WorkPlan.FindAsync(id);

        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    WorkPlanElement element = workplan.Equipment.Where(item => item.Id == elementId).FirstOrDefault();
        //    workplan.Equipment.Remove(element);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}

        //[HttpDelete("{id}/{instructionId}/instructions")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> DeleteWorkPlanInstruction(int id, int instructionId)
        //{
        //    _context.WorkPlan.Include(item => item.Instructions).ToList();
        //    var workplan = await _context.WorkPlan.FindAsync(id);

        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    WorkPlanInstruction instruction = workplan.Instructions.Where(item => item.Id == instructionId).FirstOrDefault();
        //    workplan.Instructions.Remove(instruction);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}

        //[HttpDelete("{id}/{multimediaId}/multimedia")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<IActionResult> DeleteWorkPlanMultimedia(int id, int multimediaId)
        //{
        //    _context.WorkPlan.Include(item => item.Multimedia).ToList();
        //    var workplan = await _context.WorkPlan.FindAsync(id);

        //    if (workplan == null)
        //    {
        //        return NotFound();
        //    }
        //    Multimedia m = workplan.Multimedia.Where(item => item.Id == multimediaId).FirstOrDefault();
        //    workplan.Multimedia.Remove(m);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}
        private bool WorkPlanExists(int id)
        {
            return _context.WorkPlan.Any(e => e.Id == id);
        }
    }
}
