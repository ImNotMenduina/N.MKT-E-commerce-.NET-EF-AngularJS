using System.ComponentModel.DataAnnotations;

namespace e_commerce_api.Models
{
    public class Weapon
    {
        [Key]
        public int WeaponId { get; set; }
        [Required]
        public string Uuid { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string DisplayIcon { get; set; }
        [Required]
        public List<Skin> skins { get; set; }
    }
}
