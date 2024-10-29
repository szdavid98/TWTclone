import axios from 'axios'
const BASE_URL = 'https://fapi.binance.com/fapi/v1/klines';

async function getCandlestickData(symbol, interval, startTime) {
    const data = [];
    let hasMoreData = true;
    let currentStartTime = startTime;

    while (hasMoreData) {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    symbol: symbol,
                    interval: interval,
                    startTime: currentStartTime,
                    limit: 1000 // Max limit
                }
            });

            if (response.data.length > 0) {
                data.push(...response.data);
                currentStartTime = response.data[response.data.length - 1][0] + 1; // Move to the next period
            } else {
                hasMoreData = false; // No more data
            }
        } catch (error) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            hasMoreData = false; // Exit loop on error
        }
    }

    return data;
}

async function analyzeVolume(symbol) {
    const interval = '5m';
    const startDate = new Date('2024-10-09T00:00:00Z').getTime(); // Start date
    const data = await getCandlestickData(symbol, interval, startDate);

    if (data && data.length > 1) {
        for (let i = 1; i < data.length; i++) {
            const previousCandle = data[i - 1];
            const currentCandle = data[i];

            const previousVolume = parseFloat(previousCandle[5]);
            const currentVolume = parseFloat(currentCandle[5]);

            if (currentVolume >= 10 * previousVolume) {
                console.log(`Volume surge detected for ${symbol} at ${new Date(currentCandle[0]).toLocaleString('en-HU',{timeZone: 'Europe/Budapest', hour12:false})}`);
            }
        }
    } else {
        console.log('No data available for the specified period.');
    }
}

// Example usage
const symbol = 'BIGTIMEUSDT'; // Change to your desired token
analyzeVolume(symbol);
