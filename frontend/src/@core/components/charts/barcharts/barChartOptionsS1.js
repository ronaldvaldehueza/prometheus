const getBarChartOptionsS1 = (categories, colors, direction) => ({
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '30%',
        borderRadius: 8,
        borderRadiusApplication: 'end',
        dataLabels: {
          position: 'top',
        }
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: colors,
    dataLabels: {
      enabled: true,
      formatter: function (value, series, item) {
        return value.toFixed(0)
      },
      offsetY: -30,
    },
    fill: {
      type: 'gradient',
      gradient: {
        // shade: 'dark',
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if undefined - uses the shades of same color in series
        // inverseColors: true,
        // opacityFrom: 0.7,
        // opacityTo: 0.9,
        // stops: [0, 50, 100],
        colorStops: [
          {
            offset: 0,
            color: 'rgba(var(--theme-rgb-primary-900), 0.9)', // color: '#114D7E',
            opacity: 1
          },
          {
            offset: 50,
            color: 'rgba(var(--theme-rgb-primary-400), 0.9)', // color: '#2196F3',
            opacity: 1
          },
          {
            offset: 100,
            color: 'rgba(var(--theme-rgb-primary-900), 09)', // color: '#15609C',
            opacity: 1
          }
        ]
      }
    },
    xaxis: {
      categories: categories 
    },
    yaxis: {
      opposite: direction === 'rtl'
    },

})

export default getBarChartOptionsS1