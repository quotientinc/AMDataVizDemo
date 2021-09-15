using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MvcExample.Models.ViewModels
{

    // This defines the structure of data used in the visualizations
    public class SupplierData
    {
        public string name { get; set; }
        public List<double> data { get; set; }

        public SupplierData()
        {
            data = new List<double>();
        }
    }
}
