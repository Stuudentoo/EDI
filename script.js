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
            displayData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
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
});

