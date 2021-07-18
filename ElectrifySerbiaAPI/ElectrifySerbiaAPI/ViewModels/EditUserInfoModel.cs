using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectrifySerbiaAPI.ViewModels
{
    public class EditUserInfoModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Image { get; set; }
        public string UserType { get; set; }
    }
}
