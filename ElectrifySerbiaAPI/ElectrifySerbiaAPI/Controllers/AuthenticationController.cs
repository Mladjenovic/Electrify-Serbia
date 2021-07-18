using Database;
using Database.Models;
using Domain.Database;
using ElectrifySerbiaAPI.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ElectrifySerbiaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthContext _context;
        private SignInManager<UserAuthModel> _signInManager;
        private UserManager<UserAuthModel> _userManager;
        private readonly ApplicationSettings _appSettings;

        public AuthenticationController(UserManager<UserAuthModel> userManager, SignInManager<UserAuthModel> signInManager, IOptions<ApplicationSettings> appSettings, AuthContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;

            _context = context;
        }

        [HttpGet]
        public IEnumerable<UserAuthModel> GetUsers(string type)
        {
            List<UserAuthModel> users = new List<UserAuthModel>();
            if(type == "Consumer")
            {
                users = _userManager.Users.Where(x => x.UserType == "Consumer").ToList();

            } else
            {
                users = _userManager.Users.ToList();
            }
            return users;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            _ = User.Identity.IsAuthenticated;
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                User retVal = new User
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Name = user.Name,
                    Surname = user.Surname,
                    UserType = user.UserType,
                    Image = user.Image,
                    NameOfTeam = user.NameOfTeam,
                    Address = user.Address,
                    DateOfBirth = user.DateOfBirth
                };
                return retVal;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLogIn model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim("Roles", user.UserType.ToString())
                    }),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorect" });
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<Object> SignUp(User model)
        {
            var newUser = new UserAuthModel()
            {
                UserName = model.Username,
                Email = model.Email,
                Name = model.Name,
                Surname = model.Surname,
                Address = model.Address,
                DateOfBirth = model.DateOfBirth,
                UserType = model.UserType,
                NameOfTeam = model.NameOfTeam,
                Image = model.Image,
                Loggedin = model.Loggedin,
                ConsumerType = model.ConsumerType,
                PhoneNumber = model.PhoneNumber
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("edit")]
        public async Task<Object> EditUserInfo(EditUserInfoModel model)
        {
            _ = User.Identity.IsAuthenticated;
            var user = _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);

            var newUser = user.GetAwaiter().GetResult();
            newUser.Address = model.Address != newUser.Address ? model.Address : newUser.Address;
            newUser.Name = model.Name != newUser.Name ? model.Name : newUser.Name;
            newUser.Surname = model.Surname != newUser.Surname ? model.Surname : newUser.Surname;
            newUser.PhoneNumber = model.PhoneNo != newUser.PhoneNumber ? model.PhoneNo : newUser.PhoneNumber;
            newUser.Image = model.Image != newUser.Image ? model.Image : newUser.Image;
            newUser.UserType = model.UserType;
            try
            {
                await _userManager.UpdateAsync(newUser).ConfigureAwait(false);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("changePassword")]
        public async Task<Object> EditPassword(PasswordChangeModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(await _userManager.CheckPasswordAsync(user, model.OldPassword))
            {
                try
                {
                    await _userManager.RemovePasswordAsync(user);
                    var result = await _userManager.AddPasswordAsync(user, model.NewPassword);
                    return Ok(result);
                }
                catch (Exception)
                {
                    throw;
                }
            } else
            {
                return BadRequest(new { message = "Username or password is incorect" });
            }
            
        }

    }
}
