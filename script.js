document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://my.api.mockaroo.com/edi_group_project.json?key=e76763a0";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            Chart.defaults.color = '#ebebeb';
            let earningsLabels = data.map(item => `ID ${item.id}`);
            let earningsDataset = data.map(item => item.earnings);

            let ctx = document.getElementById('myChart').getContext('2d');
            let earningsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: earningsLabels,
                    datasets: [{
                        label: 'Income by ID (in PLN)',
                        data: earningsDataset,
                        backgroundColor: 'rgba(252, 69, 153, 0.9)',
                        borderColor: 'rgba(131, 58, 180, 0.5)',
                        borderWidth: 1
                    }]
                },
            });

            let languageData = data.reduce((acc, item) => {
                acc[item.favorite_programming_language] = (acc[item.favorite_programming_language] || 0) + 1;
                return acc;
            }, {});

            let languageLabels = Object.keys(languageData);
            let languageDataset = Object.values(languageData);

            let languageCtx = document.getElementById('languageChart').getContext('2d');
            let languageChart = new Chart(languageCtx, {
                type: 'pie',
                data: {
                    labels: languageLabels,
                    datasets: [{
                        label: 'Number of People by Programming Language',
                        data: languageDataset,
                        backgroundColor: [
                            'rgba(252, 69, 153, 0.9)', 
                            'rgba(131, 58, 180, 0.9)',
                            'rgba(0, 128, 128, 0.9)',
                            'rgba(255, 215, 0, 0.9)',
                            'rgba(0, 139, 139, 0.9)',
                            'rgba(220, 20, 60, 0.9)',
                            'rgba(65, 105, 225, 0.9)',
                            'rgba(218, 165, 32, 0.9)',
                            'rgba(255, 140, 0, 0.9)',
                            'rgba(34, 139, 34, 0.9)',
                            'rgba(255, 0, 0)'
                        ],
                    }]
                },
            });

            displayData(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");

    data.forEach(item => {
        const row = document.createElement("div");
        row.className = "row mb-4";

        for (const key in item) {
            const col = document.createElement("div");
            col.className = "col-md-4";

            const card = document.createElement("div");
            card.className = "card";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const p = document.createElement("p");
            p.className = "card-text";
            p.innerHTML = `<strong>${key}:</strong> ${item[key]}`;

            cardBody.appendChild(p);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        }

        dataContainer.appendChild(row);
    });
}
