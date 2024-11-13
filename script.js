// Mengambil data dari API
fetch('http://localhost/uts/getData.php') // Sesuaikan dengan path file getData.php
    .then(response => response.json())
    .then(data => {
        let totalTemp = 0, totalHumidity = 0, totalLux = 0;
        let cardOutput = '';

        data.forEach(item => {
            // Menambahkan nilai untuk perhitungan rata-rata
            totalTemp += parseFloat(item.suhu);
            totalHumidity += parseFloat(item.humid);
            totalLux += parseFloat(item.lux);

            // Membuat card untuk setiap data
            cardOutput += `
                <div class="card">
                    <h4>Data ID: ${item.id}</h4>
                    <p><strong>Suhu:</strong> ${item.suhu}°C</p>
                    <p><strong>Kelembaban:</strong> ${item.humid}%</p>
                    <p><strong>Lux:</strong> ${item.lux}</p>
                    <p class="timestamp">${new Date(item.ts).toLocaleString()}</p>
                </div>
            `;
        });

        // Menampilkan card di halaman
        document.getElementById('weatherCards').innerHTML = cardOutput;

        // Menghitung statistik
        const totalData = data.length;
        const avgTemp = (totalTemp / totalData).toFixed(2);
        const avgHumidity = (totalHumidity / totalData).toFixed(2);
        const avgLux = (totalLux / totalData).toFixed(2);

        // Menampilkan statistik ke ringkasan
        document.getElementById('totalData').textContent = totalData;
        document.getElementById('avgTemp').textContent = avgTemp;
        document.getElementById('avgHumidity').textContent = avgHumidity;
        document.getElementById('avgLux').textContent = avgLux;
    })
    .catch(error => console.error('Error:', error));
