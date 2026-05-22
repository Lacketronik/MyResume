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
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving file. " + ex);
            }
        }

        [HttpPost("ids")]
        public async Task<IActionResult> GetFilesByIDs([FromBody] List<string> ids)
        {
            try
            {
                if (ids == null || ids.Count == 0) return Ok(new List<object>());
                var files = await _fileService.GetFilesByIDs(ids);
                return Ok(files);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving files. " + ex);
            }
        }
    }
}
