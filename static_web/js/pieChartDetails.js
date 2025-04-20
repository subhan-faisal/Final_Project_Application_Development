const data = JSON.parse(localStorage.getItem("parkingData"));
const typeCount = { Student: 0, Faculty: 0, Visitor: 0 };
data.forEach(d => typeCount[d.type]++);

new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
        labels: ['Student', 'Faculty', 'Visitor'],
        datasets: [{
            data: [typeCount.Student, typeCount.Faculty, typeCount.Visitor],
            backgroundColor: ['#f87171', '#60a5fa', '#fcd34d']
        }]
    },
    options: {
        plugins: {
            title: { display: true, text: 'Usage by Type' }
        }
    }
});
