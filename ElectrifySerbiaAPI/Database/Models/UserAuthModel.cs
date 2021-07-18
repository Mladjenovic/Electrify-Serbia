using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Database
{
    public class UserAuthModel : IdentityUser
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string UserType { get; set; }

        //If user is TeamMember
        public string NameOfTeam { get; set; }

        [Required]
        //Path to Image
        public string Image { get; set; }
        public string ConsumerType { get; set; }

        public bool Loggedin { get; set; }


        //consumers

        public string AccountID { get; set; }
        public string AccountType { get; set; }
        public int Priority { get; set; }
        public bool Approved { get; set; }

    }
}
