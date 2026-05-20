using System.Text.Json;
using System.Text.Json.Serialization;

namespace MyResumeBackend.DTOs
{
    public class ProjectDTO
    {
        public string name { get; set; }
        public string description { get; set; }
        [JsonIgnore]
        public string? rawVideoLinks { get; set; }
        [JsonIgnore]
        public string? rawImageBlobIDs { get; set; }
        public string? githubUrl { get; set; }
        public DateTime projectDate { get; set; }
        [JsonIgnore]
        public string? rawProjectFileIDs { get; set; }
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
    }
}
