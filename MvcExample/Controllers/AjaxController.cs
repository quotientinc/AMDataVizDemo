using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Specialized;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;

using MvcExample.Models;
using MvcExample.Models.ViewModels;
using MvcExample.Services;
using Newtonsoft.Json;


namespace AMIPWeb.Controllers
{
    public class AjaxController : Controller
    {
        private DataService dataService;

        public AjaxController()
        {
            dataService = new DataService();
        }

        // GET: /Ajax/SupplierData
        public async Task<IActionResult> SupplierData(int? Start, int? Rows)
        {
            int start = 0;
            int rows = 10;

            if (Start != null)
            {
                start = (int)Start;
            }
            if (Rows != null)
            {
                rows = (int)Rows;
            }

            string UserName = User.Identity.Name;
            string IpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            List<SupplierData> supplierData = await dataService.GetSupplierData(start, rows);
            return Json(supplierData);
        }


    } // controller

} // namespace
