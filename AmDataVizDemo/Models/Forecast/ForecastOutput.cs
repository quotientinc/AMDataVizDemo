using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmDataVizDemo.Models.Forecast
{

    public class ForecastOutput
    {
        //predicted values for forecasted period
        public float[] Prediction { get; set; }

        //minimum predicted values for forecasted period 
        public float[] MinPred { get; set; }

        //maximum predicted values for forecasted period 
        public float[] MaxPred { get; set; }
    }
}
