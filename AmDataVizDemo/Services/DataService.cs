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
            try
            {
                supplierData = GetDataFromJsonFile<List<SupplierDatum>>("prodSample.json");

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

            try
            {
                List<TimeSeriesDatum> data = GetDataFromJsonFile<List<TimeSeriesDatum>>("timeSeriesSample.json");
                timeSeriesData.SeriesData = data;
            }
            catch (Exception ex)
            {
                //@todo return an error to the front end
            }

            return timeSeriesData;
        }
        public List<JobTestDataViewModel> GetJobTestData()
        {
            List<JobTestDataViewModel> data = new();
            try
            {
                data = GetDataFromJsonFile<List<JobTestDataViewModel>>("testReport.json");
            }
            catch (Exception ex)
            {
                //@todo return an error to the front end
            }

            return data;
        }
        public List<SupplierDatum> GetJobTestDataTotals()
        {
            List<JobTestDataViewModel> testData = GetJobTestData();
            var groupedData = testData.GroupBy(d => d.JobName);

            List<SupplierDatum> dataTotals = new();
            foreach (var dataGroup in groupedData)
            {
                dataTotals.Add(new SupplierDatum
                {
                    name = dataGroup.Key,
                    data = new List<double> { (double)dataGroup.Count() }
                });
            }
            return dataTotals;
        }

        public List<SupplierDatum> GetProductionData()
        {
            List<SupplierDatum> data = new();
            try
            {
                data = GetDataFromJsonFile<List<SupplierDatum>>("prodSample.json");
                List<double> globalData = new();
                List<double> regionalData = new();
                for(int i = 0; i < data[0].data.Count; i++)
                {
                    double globalTotal = 0;
                    double regionalTotal = 0;
                    int regionalCount = 0;
                    for (int j = 0; j < data.Count; j++)
                    {
                        globalTotal += data[j].data[i];
                        if (j % 2 == 0)
                        {
                            regionalTotal += data[j].data[i];
                            regionalCount++;
                        }
                    }
                    globalData.Add(globalTotal / data.Count);
                    regionalData.Add(regionalTotal / regionalCount);
                }
                data.Add(new SupplierDatum { name = "Global Average", data = globalData });
                data.Add(new SupplierDatum { name = "Regional Average", data = regionalData });
            }
            catch (Exception ex)
            {
                //@todo return an error to the front end
            }

            return data;
        }

        public DataService()
        {
        }

        //Searches the wwwroot/data/ folder for the given filename. Returns the data in the file deserialzed as T.
        private T GetDataFromJsonFile<T>(string filename)
        {
            T result = default;
            string jsonFilePath = System.IO.Path.GetFullPath("wwwroot" + System.IO.Path.DirectorySeparatorChar + "data" + System.IO.Path.DirectorySeparatorChar + filename);
            try
            {
                string rawJson = System.IO.File.ReadAllText(jsonFilePath);
                result = JsonConvert.DeserializeObject<T>(rawJson);
            } catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return result;
        }
    }
}
