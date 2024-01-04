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
            // Prepare data for the first chart
            let earningsLabels = data.map(item => `ID ${item.id}`);
            let earningsDataset = data.map(item => item.earnings);

            // Create the first chart
            let ctx = document.getElementById('myChart').getContext('2d');
            let earningsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: earningsLabels,
                    datasets: [{
                        label: 'Income by ID (in PLN)',
                        data: earningsDataset,
                        backgroundColor: 'rgba(23,83,181, 0.9)',
                        borderColor: 'rgba(0,0,0, 0.5)',
                        borderWidth: 1
                    }]
                },
            });

            // Prepare data for the second chart (count people by programming language)
            let languageData = data.reduce((acc, item) => {
                acc[item.favorite_programming_language] = (acc[item.favorite_programming_language] || 0) + 1;
                return acc;
            }, {});

            let languageLabels = Object.keys(languageData);
            let languageDataset = Object.values(languageData);

            // Create the second chart
            let languageCtx = document.getElementById('languageChart').getContext('2d');
            let languageChart = new Chart(languageCtx, {
                type: 'pie',
                data: {
                    labels: languageLabels,
                    datasets: [{
                        label: 'Number of People by Programming Language',
                        data: languageDataset,
                    }]
                },
            });

            // Display data in the HTML
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");

    // Create a row for each person
    data.forEach(item => {
        const row = document.createElement("div");
        row.className = "row mb-4";

        // Create a card for each data point
        for (const key in item) {
            const col = document.createElement("div");
            col.className = "col-md-4"; // Adjust the column width as needed

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
