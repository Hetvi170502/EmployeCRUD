
using Employe_Backend.DTO;
using Employe_Backend.Models;
using Employe_Backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employe_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeController : ControllerBase
    {
        private readonly IGenericRepository<Employe> _employe;
        private readonly IGenericRepository<Designation> _designation;
        private readonly IGenericRepository<Hobby> _hobby;
        private readonly IGenericRepository<EmployeHobby> _empHobby;




        public EmployeController(IGenericRepository<Employe> employe ,
                IGenericRepository<Designation> designation, IGenericRepository<Hobby> hobby, IGenericRepository<EmployeHobby> empHobby)
        {
            _employe = employe;
            _designation = designation;
            _hobby = hobby;
            _empHobby = empHobby;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _employe.GetAll(e => e.designation);
            var hobby = await _empHobby.GetAll(h => h.Hobby);
            var result = data.Join(hobby, e => e.Id, h => h.EmployeId, (emp, hoby) => new { Employe = emp, employeHobbies = hoby }).ToList();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {

            var data = await _employe.GetData(e => e.Id == id,e => e.designation,e => e.employeHobbies);       
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> AddData(EmployeVM employe)
        {
            var designationExists = await _designation.GetOne(employe.Id);
            if(designationExists != null)
            {
                return BadRequest("Invalid DesignationId provided.");
            }
            var emp = new Employe()
            {
                EmployeName = employe.EmployeName,
                Gender = employe.Gender,
                DesignationId = employe.DesignationId,
                Email = employe.Email,
                PhoneNumber = employe.PhoneNumber,
                employeHobbies = employe.EmployeHobbies?.Select(hobbyId => new EmployeHobby {HobbyId = hobbyId}).ToList()
            };          

            await _employe.Add(emp);
            var employeDto = new EmployeVM
            {
                Id = emp.Id,
                EmployeName = emp.EmployeName,
                Gender = emp.Gender,
                DesignationId = emp.DesignationId,
                Email = emp.Email,
                PhoneNumber = emp.PhoneNumber,
                EmployeHobbies = emp.employeHobbies?.Select(eh =>  eh.HobbyId).ToList()
            };

            return Ok(employeDto); 
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateData(int id , EmployeVM employe)
        {
            var data = await _employe.GetData(e => e.Id == id, e => e.designation, e => e.employeHobbies);
            if (data == null)
            {
                return NotFound("Employee not found.");
            }
            if (data != null)
            {
                data.EmployeName = employe.EmployeName;
                data.Gender = employe.Gender;
                data.DesignationId = employe.DesignationId;             
                data.Email = employe.Email;
                data.PhoneNumber = employe.PhoneNumber;

                //Remove HobbyId if Uncheck
                if (data.employeHobbies != null)
                {
                    var hobbiesToRemove = data.employeHobbies
                        .Where(eh => !employe.EmployeHobbies.Contains(eh.HobbyId))
                        .ToList();

                    foreach (var hobbyToRemove in hobbiesToRemove)
                    {
                        data.employeHobbies.Remove(hobbyToRemove);
                    }
                }

                if (employe.EmployeHobbies != null)
                {
                    foreach (var hobbyId in employe.EmployeHobbies)
                    {
                        // Check if the hobbyId already exists
                        var existingHobby = data.employeHobbies.FirstOrDefault(eh => eh.HobbyId == hobbyId);

                        if (existingHobby != null)
                        {
                            // If the hobbyId exists, update the existing record
                            existingHobby.EmployeId = data.Id;
                        }
                        else
                        {
                            // If the hobbyId does not exist, add a new record
                            data.employeHobbies.Add(new EmployeHobby { EmployeId = data.Id, HobbyId = hobbyId });
                        }
                    }
                }

                await _employe.Update(data);

                var updatedEmployeDto = new EmployeVM
                {
                    Id = data.Id,
                    EmployeName = data.EmployeName,
                    Gender = data.Gender,
                    DesignationId = data.DesignationId,
                    Email = data.Email,
                    PhoneNumber = data.PhoneNumber,
                    EmployeHobbies = data.employeHobbies?.Select(eh => eh.HobbyId).ToList()
                };


                return Ok(updatedEmployeDto);
            }
            return BadRequest();
        }        

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteData(int id)
        {
            var data = await _employe.GetOne(id);
            if (data != null)
            {
                await _employe.Delete(data);
                return Ok();
            }
            return BadRequest();
        }
    }
}
