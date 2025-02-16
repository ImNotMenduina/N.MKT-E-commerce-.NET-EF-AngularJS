using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e_commerce_api.Models;

namespace e_commerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeaponsController : ControllerBase
    {
        private readonly ContextDb _context;

        public WeaponsController(ContextDb context)
        {
            _context = context;
        }

        // GET: api/Weapons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Weapon>>> GetWeapons()
        {
            return await _context.Weapons.ToListAsync();
        }

        // GET: api/Weapons/5
        // return weapon skins
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Skin>>> GetWeaponSkins(int id)
        {
            var skins = await _context.Skins.Where(s => s.WeaponId == id).ToListAsync();

            if (skins == null)
            {
                return NotFound();
            }

            return skins;
        }

        // PUT: api/Weapons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeapon(int id, Weapon weapon)
        {
            if (id != weapon.WeaponId)
            {
                return BadRequest();
            }

            _context.Entry(weapon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeaponExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Weapons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Weapon>> PostWeapon(Weapon weapon)
        {
            _context.Weapons.Add(weapon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeapon", new { id = weapon.WeaponId }, weapon);
        }

        // DELETE: api/Weapons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeapon(int id)
        {
            var weapon = await _context.Weapons.FindAsync(id);
            if (weapon == null)
            {
                return NotFound();
            }

            _context.Weapons.Remove(weapon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeaponExists(int id)
        {
            return _context.Weapons.Any(e => e.WeaponId == id);
        }
    }
}
