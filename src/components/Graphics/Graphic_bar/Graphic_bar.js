import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

function Graphic_bar({ title, labels, datas, orientation = "x" }) {

  const getRandomColor = () => {
    const colors = [];
    for (let i = 0; i < datas.length; i++) {
      colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }
    return colors;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        backgroundColor: getRandomColor(),
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 255, 0, 0.2)",
        hoverBorderColor: "#ff0000",
        data: datas,
      },
    ],
  };

  const options = {
    indexAxis: orientation,
    maintainAspectRatio: false,
    responsive: true,

    onClick: (evt, element) => {
      if (element.length > 0) {
        alert(data.labels[element[0].index]);
      }
    },
  };

  return <Bar data={data} options={options} />;
}

export { Graphic_bar };
