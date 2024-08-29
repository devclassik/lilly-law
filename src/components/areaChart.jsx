import React from 'react';
import ReactApexChart from 'react-apexcharts';


export const AreaChart = ({ isDark = false, isRtl = false }) => {
  const areaChart = {
    series: [
      {
        name: 'Income',
        data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 300,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#805dca'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      xaxis: {
        axisBorder: {
          color: isDark ? '#191e3a' : '#e0e6ed',
        },
      },
      yaxis: {
        opposite: isRtl ? true : false,
        labels: {
          offsetX: isRtl ? -40 : 0,
        },
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      legend: {
        horizontalAlign: 'left',
      },
      grid: {
        borderColor: isDark ? '#191E3A' : '#E0E6ED',
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
      },
    },
  };

  return (
    <ReactApexChart
      series={areaChart.series}
      options={areaChart.options}
      type="area"
      height={300}
      className="rounded-lg bg-white"
    />
  );
};
