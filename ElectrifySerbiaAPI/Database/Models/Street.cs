using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Street
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
    }
}
