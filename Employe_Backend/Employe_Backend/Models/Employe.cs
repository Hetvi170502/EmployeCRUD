using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employe_Backend.Models
{
    public class Employe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string EmployeName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [ForeignKey("Designation")]
        public int DesignationId {  get; set; }

        public Designation? designation { get; set; }      

        public List<EmployeHobby> employeHobbies { get; set; }    

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }   
    }
}
