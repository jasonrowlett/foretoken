const apiUrl = 'https://script.google.com/macros/s/AKfycbywNH3QFWNKmxRMUzOstgJCU7AtDSeAkDWeRScb35Eg4jLh7VH_PSh4Wt8f9aZ3pcnd/exec';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log("Treasuries Sample Data:", data.slice(0, 5));

    const dates = data.map(entry => entry.date);
    const tokenized = data.map(entry => parseFloat(entry.tokenized) || null);
    const physical = data.map(entry => parseFloat(entry.physical) || null);

    const ctx = document.getElementById('comparisonChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Tokenized Treasuries (USD)',
            borderColor: 'violet',
            backgroundColor: 'transparent',
            data: tokenized
          },
          {
            label: 'T-Bills (USD)',
            borderColor: 'gold',
            backgroundColor: 'transparent',
            data: physical
          }
        ]
      },
      options: {
        scales: {
          x: { ticks: { color: 'white' }},
          y: { ticks: { color: 'white' }}
        },
        plugins: {
          legend: { labels: { color: 'white' }}
        }
      }
    });
  })
  .catch(error => console.error('Error fetching treasuries chart data:', error));
