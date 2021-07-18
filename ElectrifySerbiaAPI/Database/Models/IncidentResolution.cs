using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class IncidentResolution
    {
        [Key]
        public int Id { get; set; }
        public string Cause { get; set; }
        public string SubCause { get; set; }
        public string Construction { get; set; }
        public string Material { get; set; }
    }
}
