import { useState } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [initial, setInitial] = useState(0);
  const [rate, setRate] = useState(0);
  const [dip, setdip] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [tsp, setTSP] = useState(0);

  const getDailies = (dailyInv, dip, rate, tsp) => {
    if (dailyInv === 0 || dip === 0) {
      return 0;
    }

    const dailyGrowth = rate / 365 / 100;
    let futureValue = 0;
    const numDaily = dip * 365;

    for (let i = 0; i < numDaily; i++) {
      const daysLeft = (tsp * 365) - i;
      futureValue += dailyInv * Math.pow((1 + dailyGrowth), daysLeft);
    }
    return futureValue;
  };

  const calcData = () => {
    const dataPoints = [];

    for (let year = 0; year <= tsp; year++) {
      const yearEndVal =
        (initial * Math.pow((1 + (growth / 100)), year)) +
        getDailies(rate, dip, growth, year);

      dataPoints.push({
        year: year,
        totalReturn: yearEndVal,
      });
    }
    return dataPoints;
  };

  const chartData = calcData();

  const data = {
    labels: chartData.map(point => `Year ${point.year}`),
    datasets: [
      {
        label: 'Total Return',
        data: chartData.map(point => point.totalReturn),
        borderColor: '#B45309',
        backgroundColor: 'rgba(180, 83, 9, 0.1)',
        pointBackgroundColor: '#92400E',
        pointBorderColor: '#78350F',
        tension: 0.3,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#78350F',
          font: {
            family: 'serif',
            size: 14,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        color: '#92400E',
        font: {
          family: 'serif',
          size: 18,
          weight: '600'
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years',
          color: '#78350F',
          font: {
            family: 'serif',
            size: 14,
            weight: '500'
          }
        },
        ticks: {
          color: '#92400E'
        },
        grid: {
          color: 'rgba(146, 64, 14, 0.1)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value ($)',
          color: '#78350F',
          font: {
            family: 'serif',
            size: 14,
            weight: '500'
          }
        },
        beginAtZero: true,
        ticks: {
          color: '#92400E',
          callback: function (value, index, values) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(146, 64, 14, 0.1)'
        }
      },
    },
  };

  const styles = {
    input: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)',
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 8px 32px rgba(120, 53, 15, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(180, 83, 9, 0.2)'
    },
    title: {
      textAlign: 'center',
      background: 'linear-gradient(135deg, #B45309, #78350F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '30px',
      fontWeight: '300',
      fontSize: '2.5rem',
      textShadow: '0 2px 4px rgba(120, 53, 15, 0.1)'
    },
    formDiv: {
      padding: '20px',
      marginBottom: '15px',
      backgroundColor: 'rgba(254, 243, 199, 0.3)',
      borderRadius: '8px',
      border: '1px solid rgba(180, 83, 9, 0.1)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontWeight: '500',
      color: '#78350F',
      fontSize: '14px',
      textShadow: '0 1px 2px rgba(120, 53, 15, 0.1)'
    },
    inputField: {
      padding: '12px',
      border: '2px solid rgba(180, 83, 9, 0.2)',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      color: '#78350F'
    },
    results: {
      margin: '30px 0',
      padding: '25px',
      backgroundColor: 'rgba(254, 243, 199, 0.4)',
      borderRadius: '10px',
      border: '2px solid rgba(180, 83, 9, 0.2)',
    },
    resultsHeader: {
      color: '#78350F',
      marginBottom: '15px',
      fontSize: '1.5rem',
      fontWeight: '400',
      textAlign: 'center'
    },
    resultText: {
      margin: '8px 0',
      fontSize: '16px',
      color: '#451A03',
    },
    bold: {
      color: '#78350F',
      fontWeight: '600'
    },
    graph: {
      marginTop: '30px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '25px',
      border: '2px solid rgba(180, 83, 9, 0.2)',
      boxShadow: '0 4px 20px rgba(120, 53, 15, 0.1)'
    }
  };

  return (
    <div style={styles.input}>
      <div style={styles.container}>
        <h2 style={styles.title}>Invest == Free Money?</h2>

        <div style={styles.formDiv}>
          <div style={styles.form}>
            <label style={styles.label}>Initial Investment ($)</label>
            <input
              style={styles.inputField}
              type="number"
              min="0"
              value={initial}
              onChange={e => setInitial(e.target.valueAsNumber)}
              onFocus={e => e.target.style.borderColor = '#B45309'}
              onBlur={e => e.target.style.borderColor = 'rgba(180, 83, 9, 0.2)'}
            />
          </div>
        </div>

        <div style={styles.formDiv}>
          <div style={styles.form}>
            <label style={styles.label}>Daily Investment ($)</label>
            <input
              style={styles.inputField}
              type='number'
              min="0"
              value={rate}
              onChange={e => setRate(e.target.valueAsNumber)}
              onFocus={e => e.target.style.borderColor = '#B45309'}
              onBlur={e => e.target.style.borderColor = 'rgba(180, 83, 9, 0.2)'}
            />
          </div>
        </div>

        <div style={styles.formDiv}>
          <div style={styles.form}>
            <label style={styles.label}>Daily Investment Period (Years)</label>
            <input
              style={styles.inputField}
              type='number'
              min="0"
              value={dip}
              onChange={e => setdip(e.target.valueAsNumber)}
              onFocus={e => e.target.style.borderColor = '#B45309'}
              onBlur={e => e.target.style.borderColor = 'rgba(180, 83, 9, 0.2)'}
            />
          </div>
        </div>

        <div style={styles.formDiv}>
          <div style={styles.form}>
            <label style={styles.label}>Annual Growth (%)</label>
            <input
              style={styles.inputField}
              type='number'
              min="0"
              value={growth}
              onChange={e => setGrowth(e.target.valueAsNumber)}
              onFocus={e => e.target.style.borderColor = '#B45309'}
              onBlur={e => e.target.style.borderColor = 'rgba(180, 83, 9, 0.2)'}
            />
          </div>
        </div>

        <div style={styles.formDiv}>
          <div style={styles.form}>
            <label style={styles.label}>Total Simulation Period (Years)</label>
            <input
              style={styles.inputField}
              type='number'
              min="0"
              value={tsp}
              onChange={e => setTSP(e.target.valueAsNumber)}
              onFocus={e => e.target.style.borderColor = '#B45309'}
              onBlur={e => e.target.style.borderColor = 'rgba(180, 83, 9, 0.2)'}
            />
          </div>
        </div>

        <div style={styles.results}>
          <h2 style={styles.resultsHeader}>After {tsp} years:</h2>
          <p style={styles.resultText}>
            <span style={styles.bold}>Total Principal:</span> ${(initial + (rate * dip * 365)).toLocaleString()}
          </p>
          <p style={styles.resultText}>
            <span style={styles.bold}>Total Interest:</span> ${
              ((initial * Math.pow((1 + (growth / 100)), tsp)) +
                getDailies(rate, dip, growth, tsp) -
                (initial + (rate * dip * 365))).toLocaleString()
            }
          </p>
          <p style={styles.resultText}>
            <span style={styles.bold}>Total Return:</span> ${
              ((initial * Math.pow((1 + (growth / 100)), tsp)) +
                getDailies(rate, dip, growth, tsp)).toLocaleString()
            }
          </p>
        </div>

        <div style={styles.graph}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default App;
