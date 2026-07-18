using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MyResumeBackend.DTOs
{
    public class InformationDTO
    {
        public string name { get; set; }
        public string linkedin { get; set; }
        public string github { get; set; }
        public Guid? resumeFileID { get; set; }
        public Guid? profileImageID { get; set; }
        [JsonIgnore]
        public string rawEmail { get; set; }

        [JsonIgnore]
        public string rawIntroduction { get; set; }

        [JsonIgnore]
        public string rawRole { get; set; }

        public string[] email
        {
            get
            {
                if (string.IsNullOrEmpty(rawEmail)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawEmail);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("email_address", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }

        public string[] introduction
        {
            get
            {
                if (string.IsNullOrEmpty(rawIntroduction)) return Array.Empty<string>();
                using var doc = JsonDocument.Parse(rawIntroduction);
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

        public string[] role
        {
            get
            {
                if (string.IsNullOrEmpty(rawRole)) return Array.Empty<string>();

                using var doc = JsonDocument.Parse(rawRole);
                var list = new List<string>();
                foreach (var element in doc.RootElement.EnumerateArray())
                {
                    if (element.TryGetProperty("role_name", out var prop))
                    {
                        list.Add(prop.GetString());
                    }
                }
                return list.ToArray();
            }
        }
    }
}