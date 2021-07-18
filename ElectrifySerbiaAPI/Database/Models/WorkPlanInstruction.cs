using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class WorkPlanInstruction
    {
        [Key]
        public int Id { get; set; }
        public string Element { get; set; }
        public string Text { get; set; }
        public string Status { get; set; }
    }
}
