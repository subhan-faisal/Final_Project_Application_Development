using Microsoft.AspNetCore.Mvc;

namespace USFParkingApp.Controllers
{
    public class VisualizationsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // New Detail Actions
        public IActionResult BarDetails()
        {
            return View();
        }

        public IActionResult PieDetails()
        {
            return View();
        }

        public IActionResult LineDetails()
        {
            return View();
        }
    }
}
