using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class SafetyDocument
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public int SwitchingPlan { get; set; }
        public string Status { get; set; }
        public string Creator { get; set; }
        public string Crew { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }
        public string Phone { get; set; }
        public string State { get; set; }
        public string Date { get; set; }
        public bool OperationsComplited { get; set; }
        public bool TagsRemoved { get; set; }
        public bool GroundingRemoved { get; set; }
        public bool ReadyForService { get; set; }

        public ICollection<IncidentElement> Elements { get; set; }
        public ICollection<HistoryInfo> History { get; set; }
        public ICollection<Multimedia> Multimedia { get; set; }
        public int Version { get; set; }
    }
}
