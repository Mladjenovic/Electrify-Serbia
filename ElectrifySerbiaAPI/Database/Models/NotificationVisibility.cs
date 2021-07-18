using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class NotificationVisibility
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public bool IsVisible { get; set; }
    }
}
