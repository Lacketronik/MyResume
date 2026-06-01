using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyResumeBackend.Services;

namespace MyResumeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public PortfolioController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPortfolio()
        {
            try
            {
                var portfolio = await _projectService.GetPortfolio();
                if (portfolio == null)
                    return NotFound();
                return Ok(portfolio);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving portfolio. " + ex);
            }
        }
    }
}

