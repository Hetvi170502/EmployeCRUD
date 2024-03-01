using System.ComponentModel.DataAnnotations;

namespace Employe_Backend.Models
{
    public class Designation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DesignationName { get; set; }
    }
}
