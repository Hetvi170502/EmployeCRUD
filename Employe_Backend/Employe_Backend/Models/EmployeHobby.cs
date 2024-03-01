using System.ComponentModel.DataAnnotations.Schema;

namespace Employe_Backend.Models
{
    public class EmployeHobby
    {
        public int Id { get; set; }

        [ForeignKey("Employe")]
        public int EmployeId { get; set; }
        public Employe? Employe { get; set; }

        [ForeignKey("Hobby")]
        public int HobbyId { get; set; }
        public Hobby Hobby { get; set; }
    }
}
