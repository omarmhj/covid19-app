
import React, {useState, useEffect} from 'react';
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import  Styles  from './Chart.module.css';

import ReactPlayer from "react-player";


const Chart = ({ data: { confirmed, recovered, deaths }, country }) => { 
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());

        };

        fetchAPI();        
    }, []);


    /********************************************************************/
    /****************** if we don't choose a country *******************/


    const lineChart = (
        dailyData.length
        ? ( 
            
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{

                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff' ,
                        fill: true,
                    }, {

                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red' ,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }, {}
                ],
                }}
        />) : null

              
    );

    /********************************************************************/
    /********************** if we choose a country *************************/

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People' ,
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 250, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false },
                    title: { display: true, text: `Current state in ${country}`},

                }}
            />
        )   : null
    );

    
    


    return (
        
        <>
            <div className={Styles.container}>
                {country ? barChart : lineChart }
            </div>
            <div>
                <div className={Styles.image2}><img src="/images/StaySafe.svg" /></div>
                <ReactPlayer className={Styles.video} url="https://youtu.be/9ETufT1IdlA" controls={true} />
            </div>
        </>
    );
};

export default Chart;