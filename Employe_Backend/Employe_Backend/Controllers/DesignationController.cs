using Employe_Backend.Models;
using Employe_Backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Employe_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly IGenericRepository<Designation> _designation;

        public DesignationController(IGenericRepository<Designation> designation)
        {
            _designation = designation;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _designation.GetAll();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var data = await _designation.GetOne(id);
            return Ok(data);
        }
        
    }
}
