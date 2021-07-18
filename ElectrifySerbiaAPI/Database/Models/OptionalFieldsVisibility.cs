using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class OptionalFieldsVisibility
    {
        [Key]
        public int Id { get; set; }
        public bool IsVisible { get; set; }
    }
}
