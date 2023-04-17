import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import axios from "axios";
import React ,{useEffect,useState} from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FarmChart = () => {
    
const [farms, setFarms] = useState([]);
const [trees, setTrees] = useState([]);
let potato =0;
let tomato =0;
let cucumber =0;
let coriander =0;
 let pumpkin =0;
let maize =0;

useEffect(() => {
   fetchFarms();
   fetchTrees();
  }, []);

  async function fetchFarms() {
    try {
        const response = await axios.get('http://localhost:5000/farms/getFarms');
        setFarms(response.data);   
    } catch (error) {
        console.log(error);
    }


}
async function fetchTrees() {
    try {
        const response = await axios.get('http://localhost:5000/farms/getTrees');
        setTrees(response.data);   
    } catch (error) {
        console.log(error);
    }


}
for (let i = 0; i < farms.length; i++) {
  const crops = farms[i].crops;
  for (let j = 0; j < crops.length; j++) {
    const crop = crops[j];
   
    const treeId = crop.crop;
   
    const tree = trees.find((c) => c._id === treeId);
   
    if (tree.type === "Potato") {
      potato++;
      
    }
    if (tree.type === "Tomato") {
        tomato++;
        
      }
      if (tree.type === "Cucumber") {
        cucumber++;
       
      }
      if (tree.type === "Coriander") {
        coriander++;
       
      }
      if (tree.type === "Pumpkin") {
        pumpkin++;
        
      }
      if (tree.type === "Maize") {
        maize++;
       
      }
     
  }
 
}
  const chartoptions = {
    series: [potato,tomato,cucumber,coriander,pumpkin,maize],
    options: {
      chart: {
        type: "bar",
        height: "100%",
        zoom: {
          enabled: true,
          type: "xy",
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex] + "%";
        },
        style: {
          fontSize: "17px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          colors: ["#ffffff"],
        },
      },
      stroke: {
        width: 0,
      },
      colors: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        'rgba(255, 159, 64, 0.2)'
      ],

      borderWidth: 1,
      labels: ["Potato", "Tomato", "Cucumber", "Coriander", "Pumpkin" ,"Maize"],
      legend: {
        show: true,
        position: "bottom",
        offsetY: 10,
        labels: {
          colors: "#787878",
        },
        markers: {
          width: 12,
          height: 12,
        },
      },
      // Ajouter la propriété stroke pour ajouter une bordure
      stroke: {
        width: 2,
        colors: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          'rgba(255, 159, 64, 1)'
        ],
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Farm's crops summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
           Crops Report
        </CardSubtitle>
        <Chart
          type="pie"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default FarmChart;
