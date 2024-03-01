using Employe_Backend.Models;
using Employe_Backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Employe_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HobbyController : ControllerBase
    {
        private readonly IGenericRepository<Hobby> _hobby;
        private readonly IGenericRepository<EmployeHobby> _empHobby;


        public HobbyController(IGenericRepository<Hobby> hobby, IGenericRepository<EmployeHobby> empHobby)
        {
            _hobby = hobby;
            _empHobby = empHobby;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _hobby.GetAll();
            return Ok(data);
        }

        [HttpGet("Employe")]
        public async Task<IActionResult> GetHobbies()
        {
            var data = await _empHobby.GetAll();
            return Ok(data);
        }

        [HttpGet("empHobby")]
        public async Task<IActionResult> GetHobbyId(int id)
        {
            var data = await _empHobby.GetOne(id);
            return Ok(data);
        }
    }
}
