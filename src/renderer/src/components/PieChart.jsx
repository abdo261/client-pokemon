
import ReactApexChart from 'react-apexcharts';
import ErrorAlert from './ErrorAlert';

const PieChart = ({girlsCount=50,boysCount=50,breakpoint=280,width=280,widthChart=280}) => {

  const data = {
    series: [girlsCount, boysCount], 
    options: {
      chart: {
        type: 'pie',
        width: widthChart,
      },
      labels: ['Filles', 'Garçons'], 
      colors: ['#FFC0CB', '#4682B4'],
      
      responsive: [{
        breakpoint: breakpoint,
        options: {
          chart: {
            width: width,
            
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  return (
    <div className="pie-chart">
      {
        (girlsCount===0 && boysCount===0 ) ? (<ErrorAlert variant='warning' className="mt-4" message="Aucun étudiant"/>):( <ReactApexChart options={data.options} series={data.series} type="pie" width="280"  />)
      }
     
    </div>
  );
};

export default PieChart;
