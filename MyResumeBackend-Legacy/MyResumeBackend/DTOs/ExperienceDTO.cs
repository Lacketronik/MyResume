using System.Text.Json;
using System.Text.Json.Serialization;

namespace MyResumeBackend.DTOs
{
    public class ExperienceDTO
    {
        public string company { get; set; }
        public string position { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? endDate { get; set; }
        [JsonIgnore]
        public string rawResponsibilities { get; set; }
        public string[] responsibilities
        {
            get
            {
                if (string.IsNullOrEmpty(rawResponsibilities)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawResponsibilities);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("description", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
    }
}
