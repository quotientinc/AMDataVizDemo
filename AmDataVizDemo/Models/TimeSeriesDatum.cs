using System;
using System.Collections.Generic;
using AmDataVizDemo.Models.Forecast;
namespace AmDataVizDemo.Models
{
    public class TimeSeriesDatum
    {
        public DateTime Feature { get; set; }
        public Single Idx { get; set; }
        public float TimeValue { get; set; }

        public TimeSeriesDatum()
        {

        }
    }

    public class TimeSeriesPrediction
    {
        public TimeSeriesData InputData { get; set; }
        public ForecastOutput ForecastData { get; set; }

        //vector to hold alert,score,p-value values
        //[VectorType(3)] public double[] Prediction { get; set; }
    }

    public class TimeSeriesData
    {
        public string SeriesName { get; set; }
        public List<TimeSeriesDatum> SeriesData { get; set; }

        public TimeSeriesData()
        {
            SeriesData = new List<TimeSeriesDatum>();
        }
    }
}
