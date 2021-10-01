using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmDataVizDemo.Models.ViewModels
{
    public class JobTestDataViewModel
    {
        public string JobName { get; set; }
        public string SupplierName { get; set; }
        public string DeviceReportName { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime ReportTime { get; set; }
        public string StepName { get; set; }
        public string EquipmentType { get; set; }
        public string KpiName { get; set; }
        public string KpiUnits { get; set; }
        public string KpiValue { get; set; }
        public string[] KpiDataType { get; set; }
    }
}
