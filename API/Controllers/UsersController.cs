using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
    private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            Console.WriteLine("-------------------context------------------");
            Console.WriteLine(context);
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.User.ToListAsync();
            Console.WriteLine("-------------------users------------------");
            Console.WriteLine(users);
            return  users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.User.FindAsync(id);
        }
    }
}