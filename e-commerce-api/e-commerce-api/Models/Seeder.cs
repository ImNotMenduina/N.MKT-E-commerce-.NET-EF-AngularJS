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

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var weapons = JsonConvert.DeserializeObject<Data<List<Weapon>>>(json);

                if (weapons != null)
                {
                    await context.Weapons.AddRangeAsync(weapons.data);
                    await context.SaveChangesAsync();

                    foreach (var weapon in weapons.data)
                    {
                        response = await httpClient.GetAsync($"weapons/{weapon.Uuid}");

                        if (response.IsSuccessStatusCode)
                        {
                            json = await response.Content.ReadAsStringAsync();
                            var skinsResponse = JsonConvert.DeserializeObject<Response>(json);

                            if (skinsResponse != null && skinsResponse.data != null) 
                            {
                                List<Skin> skins = skinsResponse.data.Skins;

                                foreach (var skin in skins)
                                {
                                    var skin_exists = await context.Skins.FirstOrDefaultAsync(x => x.DisplayName == skin.DisplayName);
                                    if (skin_exists != null)
                                        continue;

                                    skin.WeaponId = weapon.WeaponId;
                                }

                                context.Skins.AddRange(skins);
                            }
                        }
                    }

                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
