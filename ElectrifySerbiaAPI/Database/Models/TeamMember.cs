using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class TeamMember
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string UserName { get; set; }
        public string NameOfTeam { get; set; }
    }
}
