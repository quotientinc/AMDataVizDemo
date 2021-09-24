using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using MvcExample.Models.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace MvcExample.Services
{
    public class DataService
    {

        public async Task<List<SupplierData>> GetSupplierData(int? Start, int? Rows)
        {
            List<SupplierData> supplierData = new List<SupplierData>();

            // for now, just read the static data from the file
            string prodSampleFilePath = System.IO.Path.GetFullPath("wwwroot" + System.IO.Path.DirectorySeparatorChar + "prodSample.json");
            string prodDataRawJson = System.IO.File.ReadAllText(prodSampleFilePath);

            try
            {
                supplierData = JsonConvert.DeserializeObject<List<SupplierData>>(prodDataRawJson);

                if(supplierData.Count > 0) {
                    if (null == Start || Start < 0 || Start > supplierData.Count)
                    {
                        Start = 0;
                    }
                    if(null == Rows || Rows > supplierData.Count)
                    {
                        Rows = supplierData.Count;
                    }
                    supplierData = supplierData.Skip((int)Start).Take((int)Rows).ToList();
                }

            }
            catch(Exception ex)
            {
                //@todo return an error to the front end
            }

            return supplierData;

        }

        public DataService()
        {
        }
    }
}
