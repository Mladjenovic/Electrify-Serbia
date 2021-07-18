using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Element
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
        public int Version { get; set; }
    }
}
