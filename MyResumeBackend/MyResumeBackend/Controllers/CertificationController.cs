using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyResumeBackend.Services;

namespace MyResumeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificationController : ControllerBase
    {
        private readonly ICertificationService _certificationService;

        public CertificationController(ICertificationService certificationService)
        {
            _certificationService = certificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCertification()
        {
            try
            {
                var certs = await _certificationService.GetCertification();
                if (certs == null || !certs.Any())
                    return NotFound();
                return Ok(certs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving certification. " + ex);
            }
        }
    }
}
