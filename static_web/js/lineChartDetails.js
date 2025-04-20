const lots = JSON.parse(localStorage.getItem("parkingData"));
const avgTrend = [0, 0, 0, 0, 0];
lots.forEach(lot => {
    lot.history.forEach((val, i) => {
        avgTrend[i] += val;
    });
});
for (let i = 0; i < avgTrend.length; i++) {
    avgTrend[i] /= lots.length;
}

new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM'],
        datasets: [{
            label: 'Avg. Availability',
            data: avgTrend,
            borderColor: '#a78bfa',
            tension: 0.4
        }]
    },
    options: {
        plugins: {
            title: { display: true, text: 'Availability Trends Over Time' }
        }
    }
});
