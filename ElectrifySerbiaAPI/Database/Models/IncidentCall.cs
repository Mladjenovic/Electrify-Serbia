using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class IncidentCall
    {
        [Key]
        public int Key { get; set; }
        public int Id { get; set; }
        public string Reason { get; set; }
        public string Hazard { get; set; }
        public string Comment { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Address { get; set; }
        public int Priority { get; set; }
    }
}
