using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyResumeBackend.Services;

namespace MyResumeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProject()
        {
            try
            {
                var projs = await _projectService.GetProject();
                if (projs == null || !projs.Any())
                    return NotFound();
                return Ok(projs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving project. " + ex);
            }
        }

        [HttpGet("Image/id")]
        public async Task<IActionResult> GetImageDetails(string id)
        {
            try
            {
                var img = await _projectService.GetImageDetails(id);
                if (img == null)
                    return NotFound();
                return Ok(img);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving image details. " + ex);
            }
        }

        [HttpPost("Image/ids")]
        public async Task<IActionResult> GetImageDetailsByIDs([FromBody] List<string> ids)
        {
            try
            {
                if (ids == null || ids.Count == 0) return Ok(new List<object>());
                var imgs = await _projectService.GetImageDetailsByIDs(ids);
                return Ok(imgs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving image details. " + ex);
            }
        }
    }
}
