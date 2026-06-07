using System.Text.Json;
using System.Text.Json.Serialization;

namespace MyResumeBackend.DTOs
{
    public class ProjectDTO
    {
        public string name { get; set; }
        [JsonIgnore]
        public string? rawDescriptions { get; set; }
        [JsonIgnore]
        public string? rawVideoLinks { get; set; }
        [JsonIgnore]
        public string? rawImageBlobIDs { get; set; }
        public string? githubUrl { get; set; }
        public DateTime projectDate { get; set; }
        [JsonIgnore]
        public string? rawProjectFileIDs { get; set; }
        [JsonIgnore]
        public string? rawTechnologies { get; set; }
        [JsonIgnore]
        public string? rawProjectDemos { get; set; }
        public IEnumerable<ProjectDescriptionDTO> descriptions
        {
            get
            {
                if (string.IsNullOrEmpty(rawDescriptions)) return Array.Empty<ProjectDescriptionDTO>();
                using var doc = JsonDocument.Parse(rawDescriptions);
                var list = new List<ProjectDescriptionDTO>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    var dto = new ProjectDescriptionDTO();
                    if (element.TryGetProperty("description", out var descProp))
                    {
                        dto.description = descProp.GetString();
                    }
                    if (element.TryGetProperty("type", out var typeProp))
                    {
                        dto.type = typeProp.GetString();
                    }
                    list.Add(dto);
                }
                return list.ToArray();
            }
        }
        public string[] videoLinks
        {
            get
            {
                if (string.IsNullOrEmpty(rawVideoLinks)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawVideoLinks);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("video_link", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
        public string[] imageBlobIDs
        {
            get
            {
                if (string.IsNullOrEmpty(rawImageBlobIDs)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawImageBlobIDs);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("file_id", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
        public string[] projectFileIDs
        {
            get
            {
                if (string.IsNullOrEmpty(rawProjectFileIDs)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawProjectFileIDs);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("file_id", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
        public string[] technologies
        {
            get
            {
                if (string.IsNullOrEmpty(rawTechnologies)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawTechnologies);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("technology_name", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
        public string[] demos
        {
            get
            {
                if (string.IsNullOrEmpty(rawProjectDemos)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawProjectDemos);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("demo_link", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
    }
}
