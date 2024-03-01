using System.ComponentModel.DataAnnotations;

namespace Employe_Backend.Models
{
    public class Hobby
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string HobbyName { get; set; }
    }
}
