const ctx = document.getElementById('concourseChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Replace with actual labels
    datasets: [
      {
        label: 'Tokenized Asset (USD)',
        data: [], // Replace with tokenized data
        borderColor: '#AA00FF',
        backgroundColor: 'transparent',
        borderWidth: 2
      },
      {
        label: 'Physical Asset (USD)',
        data: [], // Replace with physical data
        borderColor: '#FFD700',
        backgroundColor: 'transparent',
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'yyyy-MM-dd',
          displayFormats: {
            month: 'MMM yyyy'
          }
        },
        ticks: {
          color: '#ffffff'
        }
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: '#ffffff'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        }
      }
    }
  }
});
