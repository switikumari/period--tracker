
let cycleHistory = [];

function trackPeriod() {
  const inputDate = document.getElementById('start-date').value;
  if (!inputDate) {
    alert("Please enter a valid date.");
    return;
  }

  const startDate = new Date(inputDate);
  const cycleLength = 28;
  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(startDate.getDate() + cycleLength);

  const today = new Date();
  const diffTime = nextPeriod - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById('result').innerHTML = `
    <p>Next Period: <strong>${nextPeriod.toDateString()}</strong></p>
    <p>Days left: <strong>${diffDays}</strong></p>
  `;

  // Save to localStorage
  localStorage.setItem('lastPeriod', inputDate);

  // Add to cycle history
  cycleHistory.push({ date: inputDate, length: cycleLength });
  updateChart();
}

function updateChart() {
  const ctx = document.getElementById('cycleChart').getContext('2d');
  
  // Destroy old chart if exists
  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cycleHistory.map(entry => entry.date),
      datasets: [{
        label: 'Cycle Length (days)',
        data: cycleHistory.map(entry => entry.length),
        backgroundColor: '#ff5f7b',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 40
        }
      }
    }
  });
}
