using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AmDataVizDemo.Models.ViewModels
{

    // This defines the structure of data used in the visualizations
    public class SupplierDatum
    {
        public string name { get; set; }
        public List<double> data { get; set; }

        public SupplierDatum()
        {
            data = new List<double>();
        }
    }
    public class LatLonData
    {
        public string name { get; set; }
        public string material { get; set; }
        public string state { get; set; }
        public string type { get; set; }
        public float lat { get; set; }
        public float lon { get; set; }

        public LatLonData()
        {
            lat = new float();
            lon = new float();
        }
    }
}
