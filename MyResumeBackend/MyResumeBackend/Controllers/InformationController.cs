using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyResumeBackend.Services;

namespace MyResumeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformationController : ControllerBase
    {
        private readonly IInformationService _informationService;

        public InformationController(IInformationService informationService)
        {
            _informationService = informationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetInformation()
        {
            try
            {
                var info = await _informationService.GetInformation();
                if (info == null)
                    return NotFound();
                return Ok(info);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving information. " + ex );
            }
        }
    }
}
