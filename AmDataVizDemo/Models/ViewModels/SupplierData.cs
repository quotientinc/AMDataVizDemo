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
        public string Company_Name { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Build_Preparation { get; set; }
        public string Part { get; set; }
        public string Material { get; set; }
        public string Type { get; set; }
        public float lat { get; set; }
        public float lon { get; set; }
    }

    public class TestData
    {
        public string name { get; set; }
        public List<double> data { get; set; }
        public TestData()
        {
            data = new List<double>();
        }
    }
}

