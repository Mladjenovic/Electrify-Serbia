using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Database
{
    public class User
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int Id { get; set; }

        [Key]
        public int UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public string DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string UserType { get; set; }
        public string ConsumerType { get; set; }

        //If user is TeamMember
        public string NameOfTeam { get; set; }

        [Required]
        //Path to Image
        public string Image { get; set; }

        public bool Loggedin { get; set; }

        public string AccountID { get; set; }
        public string AccountType { get; set; }
        public int Priority { get; set; }
        public string PhoneNumber { get; set; }
        public bool Approved { get; set; }

    }
}
