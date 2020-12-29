import Head from 'next/head'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import useInputState from '../hooks/useInputState'
import styles from '../styles/Home.module.css'



const INTERVAL = '5min'

export default function Home() {

  const [xValues, setxValues] = useState([])
  const [yValues, setyValues] = useState([])
  const [ticker, handleChange] = useInputState("")
  const [chartData, updataChartData] = useState()


  useEffect(() => {
    let data2 = {
      labels: xValues,
      datasets: [
        {
          label: 'Price',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: yValues
        }
      ]
    };
    updataChartData(data2)

  }, [xValues, yValues])

  async function handleClick(evt){
    evt.preventDefault()
    const key = 'RRW060739R2RO40L'
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=${INTERVAL}&symbol=${ticker}&apikey=${key}`
    let data = await axios.get(url)

    let x = []
    let y = []
  
    let priceData = data.data
    
    for(let key in priceData[`Time Series (${INTERVAL})`]){
      let keyParts = key.split(' ')
      x.push(keyParts[1])
      y.push(priceData[`Time Series (${INTERVAL})`][key]['1. open'])
      
    }
    setxValues(x.reverse())
    setyValues(y)
  }

  return (
    
    <div className={styles.container} width="30%">
      <Head>
        <title>Stonks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form>
      <input onChange={handleChange}></input>
      <button onClick={handleClick} type="submit">plop</button>
      </form>
      <Line
      data={chartData}
      options={{ maintainAspectRatio: false }}
    />
    </div>

  )
}



