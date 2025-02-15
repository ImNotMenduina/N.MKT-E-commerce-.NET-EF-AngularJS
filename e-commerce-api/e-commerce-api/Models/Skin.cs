using System.ComponentModel.DataAnnotations;

namespace e_commerce_api.Models
{
    public class Skin
    {
        [Key]
        public int SkinId { get; set; }
        [Required]
        public string DisplayName { get; set; }
        public string? DisplayIcon { get; set; }
        public Weapon Weapon { get; set; }
        [Required]
        public int WeaponId { get; set; }
    }
}