using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class HistoryInfo
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string State { get; set; }
        public string Date { get; set; }
    }
}
