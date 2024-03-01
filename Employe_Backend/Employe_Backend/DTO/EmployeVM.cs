using Employe_Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Employe_Backend.DTO
{
    public class EmployeVM
    {
        public int Id { get; set; }

        [Required]
        public string EmployeName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]   
        public int DesignationId { get; set; }   
        
        [Required]
        public List<int> EmployeHobbies { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}
