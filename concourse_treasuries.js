fetch("https://script.google.com/macros/s/AKfycbywNH3QFWNKmxRMUzOstgJCU7AtDSeAkDWeRScb35Eg4jLh7VH_PSh4Wt8f9aZ3pcnd/exec")
  .then(res => res.json())
  .then(data => {
    const labels = data.map(row => row.Date);
    const ondo = data.map(row => parseFloat(row.ONDO));
    const mtbill = data.map(row => parseFloat(row.MTBILL));
    const tbill = data.map(row => parseFloat(row.TBILL));
    const ustbl = data.map(row => parseFloat(row.USTBL));
    const dtb3 = data.map(row => parseFloat(row.DTB3));
    const dtb6 = data.map(row => parseFloat(row.DTB6));

    const canvasEl = document.getElementById("concourseChart");
    canvasEl.height = 400;
    canvasEl.width = canvasEl.offsetWidth;

    const ctx = canvasEl.getContext("2d");

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: "ONDO", data: ondo, borderColor: "purple", borderWidth: 2 },
          { label: "MTBILL", data: mtbill, borderColor: "teal", borderWidth: 2 },
          { label: "TBILL", data: tbill, borderColor: "orange", borderWidth: 2 },
          { label: "USTBL", data: ustbl, borderColor: "blue", borderWidth: 2 },
          { label: "DTB3", data: dtb3, borderColor: "green", borderWidth: 2, borderDash: [5, 5] },
          { label: "DTB6", data: dtb6, borderColor: "red", borderWidth: 2, borderDash: [5, 5] }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Date' }},
          y: { title: { display: true, text: 'USD or %' }, beginAtZero: false }
        }
      }
    });
  })
  .catch(err => console.error("Data fetch error:", err));
