using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;
        public ProductsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

    }
}