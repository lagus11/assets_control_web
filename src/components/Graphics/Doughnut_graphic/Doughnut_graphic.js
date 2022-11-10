import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function Doughnut_graphic({labels, datas}) {

    const data = {
        labels:labels,
        datasets:[{
            label: 'Points',
            data: datas,
            backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9', '#e67e22']
        }
        ]
    };

    const options = {
        cutoutPercentage: 80,
        maintainAspectRatio: false,
        responsive: true,
        onClick: (evt, element) => {
            if(element.length > 0 ){
                alert(data.labels[element[0].index]);
            }
        }
    }

    return(
        <Doughnut data={data} options={options}/>
    );

}

export { Doughnut_graphic };