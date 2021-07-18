using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Timestamp { get; set; }
        public string UserId { get; set; }
        public int DocumentId { get; set; }
        public string DocumentType { get; set; }
        public bool IsRead { get; set; }
    }
}
