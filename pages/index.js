import Head from 'next/head'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import useInputState from '../hooks/useInputState'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [xValues, setxValues] = useState([])
  const [yValues, setyValues] = useState([])
  const [visibility, showTicker] = useState()
  const [ticker, handleChange] = useInputState("")
  const [chartData, updataChartData] = useState()


  useEffect(() => {
   
    let tickerData = {
      labels: xValues,
      datasets: [{
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
      }]
    };
    updataChartData(tickerData)

  }, [xValues, yValues])

  async function handleSubmit(evt){
    evt.preventDefault()
    const key = 'RRW060739R2RO40L'
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${key}`
    let data = await axios.get(url)

    let x = []
    let y = []
  
    let priceData = data.data
    
    for(let key in priceData[`Time Series (Daily)`]){

      x.push(key)
      y.push(priceData[`Time Series (Daily)`][key]['4. close'])
      
    }
    setxValues(x.slice(0, 7).reverse())
    setyValues(y.slice(0, 7).reverse())
    showTicker(ticker)
  }

  return (
    
    <div className={styles.container} >
      <Head>
        <title>Stonks</title>
        <link rel="icon" href="/favicon.ico" />
        <link 
         href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
         rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
         crossorigin="anonymous">
         </link>
      </Head>
      <h2>Price action of last 7 days</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
      <input onChange={handleChange} placeholder="Ticker Symbol"/>
      <button type="button" className="btn btn-dark">Search</button>
      
      </form>
      <div>Ticker: {visibility !== undefined ? visibility.toUpperCase(): null}</div>
      
      <Line
      data={chartData}
      options={{ maintainAspectRatio: false }}
    />
    </div>

  )
}



