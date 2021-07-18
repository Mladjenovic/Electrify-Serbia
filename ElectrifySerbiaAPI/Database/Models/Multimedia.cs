using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Multimedia
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
    }
}
