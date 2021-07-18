using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class WorkPlanElement
    {
        [Key]
        public int key { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
    }
}
