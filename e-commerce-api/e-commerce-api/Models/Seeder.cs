using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace e_commerce_api.Models
{
    class Data<T>
    {
        public T data { get; set; }
    }

    class Response
    {
        public DataSkins data { get; set; }
    }

    class DataSkins
    {
        public List<Skin> Skins { get; set; }
    }
    public class Seeder
    {
        public static async Task WeaponDbInitializer()
        {
            var contextOptions = new DbContextOptionsBuilder<ContextDb>()
                .UseSqlServer(@"Server=(localdb)\\MSSQLLocalDB;Database=NMDb;Trusted_Connection=True;MultipleActiveResultSets=True")
                .Options;

            using var context = new ContextDb(contextOptions);

            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("https://valorant-api.com/v1/");

            var response = await httpClient.GetAsync("weapons");
            var json = await response.Content.ReadAsStringAsync();
            var weapons = JsonConvert.DeserializeObject<Data<List<Weapon>>>(json);

            if (weapons != null)
            {
                await context.Weapons.AddRangeAsync(weapons.data);
                await context.SaveChangesAsync();

                foreach (var weapon in weapons.data)
                {
                    response = await httpClient.GetAsync($"weapons/{weapon.Uuid}");
                    json = await response.Content.ReadAsStringAsync();
                    var skins = JsonConvert.DeserializeObject<Response>(json);

                    if (skins != null) {

                        foreach (var skin in skins.data.Skins)
                        {
                            skin.WeaponId = weapon.WeaponId;
                        }

                        context.AddRange(skins.data.Skins);
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
