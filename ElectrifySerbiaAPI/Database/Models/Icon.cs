using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Icon
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Route { get; set; }
    }
}
