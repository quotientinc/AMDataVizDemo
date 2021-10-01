using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AmDataVizDemo.Models;
using AmDataVizDemo.Services;
using AmDataVizDemo.Models.ViewModels;

namespace AmDataVizDemo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DataService _dataService;

        public HomeController(ILogger<HomeController> logger, DataService dataService)
        {
            _dataService = dataService;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View("Dashboard");
        }

        public IActionResult Example()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }

        public IActionResult ProductionForecastCharts()
        {
            return View();
        }
        public IActionResult ProductionCharts()
        {
            return View();
        }
        public IActionResult TestCharts()
        {
            return View();
        }

        public IActionResult ProductionComparison()
        {
            return View();
        }
        public IActionResult Materials()
        {
            return View();
        }
        public IActionResult Machines()
        {
            return View();
        }
        public IActionResult SupplierMap()
        {
            return View();
        }

        public IActionResult ProductionData()
        {
            return View();
        }
        public async Task<IActionResult> TestData()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
