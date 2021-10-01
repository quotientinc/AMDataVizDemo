using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using AmDataVizDemo.Models;
using AmDataVizDemo.Models.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace AmDataVizDemo.Services
{
    public class DataService
    {

        public async Task<List<SupplierDatum>> GetSupplierData(int? Start, int? Rows)
        {
            List<SupplierDatum> supplierData = new List<SupplierDatum>();

            // for now, just read the static data from the file
            string prodSampleFilePath = System.IO.Path.GetFullPath("wwwroot" + System.IO.Path.DirectorySeparatorChar
                + "data" + System.IO.Path.DirectorySeparatorChar + "prodSample.json");
            string prodDataRawJson = System.IO.File.ReadAllText(prodSampleFilePath);

            try
            {
                supplierData = JsonConvert.DeserializeObject<List<SupplierDatum>>(prodDataRawJson);

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

        public async Task<TimeSeriesData> GetTimeSeriesData(string seriesName)
        {
            TimeSeriesData timeSeriesData = new TimeSeriesData();
            timeSeriesData.SeriesName = seriesName;

            // for now, just read the static data from the file
            string timeSeriesSampleFilePath = System.IO.Path.GetFullPath("wwwroot" + System.IO.Path.DirectorySeparatorChar + "timeSeriesSample.json");
            string timeSeriesDataRawJson = System.IO.File.ReadAllText(timeSeriesSampleFilePath);

            try
            {
                List<TimeSeriesDatum> data = JsonConvert.DeserializeObject<List<TimeSeriesDatum>>(timeSeriesDataRawJson);
                timeSeriesData.SeriesData = data;
            }
            catch (Exception ex)
            {
                //@todo return an error to the front end
            }

            return timeSeriesData;
        }
        public async Task<List<JobTestDataViewModel>> GetJobTestData()
        {
            // for now, just read the static data from the file
            string jobTableDataJsonFilePath = System.IO.Path.GetFullPath("wwwroot" + System.IO.Path.DirectorySeparatorChar + "data" + System.IO.Path.DirectorySeparatorChar + "testReport.json");
            string jobTableDataRawJson = System.IO.File.ReadAllText(jobTableDataJsonFilePath);

            List<JobTestDataViewModel> data = new();
            try
            {
                data = JsonConvert.DeserializeObject<List<JobTestDataViewModel>>(jobTableDataRawJson);
            }
            catch (Exception ex)
            {
                //@todo return an error to the front end
            }

            return data;
        }
        public async Task<List<SupplierDatum>> GetJobTestDataTotals()
        {
            List<JobTestDataViewModel> testData = await GetJobTestData();
            var groupedData = testData.GroupBy(d => d.JobName);

            List<SupplierDatum> dataTotals = new();
            foreach(var dataGroup in groupedData)
            {
                dataTotals.Add(new SupplierDatum
                {
                    name = dataGroup.Key,
                    data = new List<double> { (double)dataGroup.Count() }
                });
            }
            return dataTotals;
        }
        public DataService()
        {
        }
    }
}
