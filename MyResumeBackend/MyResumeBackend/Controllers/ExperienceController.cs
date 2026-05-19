using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyResumeBackend.Services;

namespace MyResumeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IExperienceService _experienceService;

        public ExperienceController(IExperienceService experienceService)
        {
            _experienceService = experienceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetExperience()
        {
            try
            {
                var exps = await _experienceService.GetExperience();
                if (exps == null || !exps.Any())
                    return NotFound();
                return Ok(exps);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving experience. " + ex);
            }
        }
    }
}
