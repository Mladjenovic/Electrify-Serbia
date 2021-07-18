using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public UserType UserType { get; set; }

        //If user is TeamMember
        public string NameOfTeam { get; set; }

        [Required]
        //Path to Image
        public string Image { get; set; }

        public bool Loggedin { get; set; }



        //consumers
        public string AccountID { get; set; }
        public string AccountType { get; set; }
        public int Priority { get; set; }
        public bool Approved { get; set; }

    }
}
