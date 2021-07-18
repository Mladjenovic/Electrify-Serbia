using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class WorkPlan
    {
        [Key]
        public int Id { get; set; }
        public string DocumentType { get; set; }
        public int WorkRequestId { get; set; }
        public string Status { get; set; }
        public int IncidentId { get; set; }
        public string Address { get; set; }
        public string StartDateTime { get; set; }
        public string EndDateTime { get; set; }
        public int CrewId { get; set; }
        public string CreatedBy { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public string Details { get; set; }
        public string Company { get; set; }
        public string PhoneNumber { get; set; }
        public string CreatedDateTime { get; set; }
        public string Username { get; set; }
        //public ICollection<HistoryInfo> HistoryInfos { get; set; }
        //public ICollection<Multimedia> Multimedia { get; set; }
        //public ICollection<WorkPlanElement> Equipment { get; set; }
        //public ICollection<WorkPlanInstruction> Instructions { get; set; }
    }
}
