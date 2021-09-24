using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.Data.Analysis;
using Microsoft.ML.Transforms.TimeSeries;
using Microsoft.AspNetCore.Html;

using Newtonsoft.Json;
using XPlot.Plotly;

using AmDataVizDemo.Models;
using AmDataVizDemo.Models.Forecast;


namespace AmDataVizDemo.Services
{
    public class ForecastService
    {
        // Forecast API
        const int WINDOW_SIZE = 5;
        const int SERIES_LENGTH = 10;
        const int TRAIN_SIZE = 100;
        const int HORIZON = 7;

        // Dataset
        const int DEFAULT_ROW_COUNT = 10;
        const string TOTAL_CONFIRMED_COLUMN = "TotalConfirmed";
        const string DATE_COLUMN = "Date";

        private MLContext context { get; set; }

        public ForecastService()
        {
            context = new MLContext();

        }

        public async Task<TimeSeriesPrediction> PerformArima()
        {   //  param: TimeSeriesData timeSeries

            // for now, just read the static data from the file
            string filePath = System.IO.Path.GetFullPath("wwwroot" + System.IO.Path.DirectorySeparatorChar + "timeSeriesSample.json");
            string dataRawJson = System.IO.File.ReadAllText(filePath);

            TimeSeriesData timeSeries = new TimeSeriesData();
            TimeSeriesPrediction prediction = new TimeSeriesPrediction();

            try
            {
                timeSeries = JsonConvert.DeserializeObject<TimeSeriesData>(dataRawJson);
                prediction.InputData = timeSeries;

                var mlData = context.Data.LoadFromEnumerable(timeSeries.SeriesData);

                // this is how to convert back to an IEnumerable from a DataView:
                // IEnumerable<TimeSeriesData> timeSeriesDataEnumerable = context.Data
                //    .CreateEnumerable<TimeSeriesData>(someDataView, reuseRowObject: true);

                var pipeline = context.Forecasting.ForecastBySsa(
                        "Prediction",   // output column name must match a class attribute defined in the output class
                        "TimeValue",    // input column name must match the column containing the value we care about, from the incoming data
                        windowSize: 4,
                        seriesLength: 10,
                        trainSize: 10,
                        horizon: 4
                    );

                var model = pipeline.Fit(mlData);

                var forecastingEngine = model
                    .CreateTimeSeriesEngine<TimeSeriesDatum, ForecastOutput>(context, true);
                var forecasts = forecastingEngine.Predict(); // could add horizon as a param to this call

                prediction.ForecastData = new ForecastOutput
                {
                    Prediction = forecasts.Prediction,
                    MaxPred = forecasts.MaxPred,
                    MinPred = forecasts.MinPred,
                };

            }
            catch (Exception ex)
            {

            }

            return prediction;
        }

    }
}
