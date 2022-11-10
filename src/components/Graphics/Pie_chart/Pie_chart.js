import React from 'react';
import { Pie } from 'react-chartjs-2';

function Pie_chart({labels, datas}){
    
    const data = {
        labels:labels,
        datasets:[{
            data: datas,
            backgroundColor: ['#A2E8A4', 'blue', 'green', '#FF0000' , '#D8D6C5', '#B6A9C7']
        }]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        onClick: (evt, element) => {
            if(element.length > 0 ){
                alert(data.labels[element[0].index]);
            }
        }
    }

    return(
        <Pie data={data} options={options} />
    );
}

export { Pie_chart };