using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyResumeBackend.Services;

namespace MyResumeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetFileByID(string id)
        {
            try
            {
                var file = await _fileService.GetFileByID(id);
                if (file == null)
                    return NotFound();
                return Ok(file);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving experience. " + ex);
            }
        }
    }
}
