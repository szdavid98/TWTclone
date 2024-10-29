import axios from 'axios'

const BASE_URL = 'https://fapi.binance.com/fapi/v1/klines';
const SYMBOLS_URL = 'https://fapi.binance.com/fapi/v1/exchangeInfo';
const minvol = 1000000
async function getFuturesSymbols() {
    try {
        const response = await axios.get(SYMBOLS_URL);
        return response.data.symbols
            .filter(symbol => symbol.status === 'TRADING') // Only trading symbols
            .map(symbol => symbol.symbol);
    } catch (error) {
        console.error('Error fetching symbols:', error.message);
        return [];
    }
}

async function getLatestCandlestickData(symbol, interval) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                symbol: symbol,
                interval: interval,
                limit: 2 // Get the last two candles
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        return [];
    }
}

async function monitorVolumeSurges() {
    const interval = '5m';
    const symbols = await getFuturesSymbols();
    const previousVolumes = {}; // Store the previous volume for each symbol

    if (symbols.length === 0) {
        console.log('No trading symbols found.');
        return;
    }

    console.log('Monitoring volume surges for:', symbols.join(', '));

    // Monitor indefinitely
    setInterval(async () => {
        for (const symbol of symbols) {
            const data = await getLatestCandlestickData(symbol, interval);

            if (data && data.length === 2) { // Ensure we have two candles
                const previousCandle = data[0];
                const currentCandle = data[1];

                const previousVolume = parseFloat(previousCandle[5]);
                const currentVolume = parseFloat(currentCandle[5]);

                // Store the previous volume for comparison
                previousVolumes[symbol] = previousVolumes[symbol] || previousVolume;

                // Compare current volume with the previous volume
                if (currentVolume >= 5 * previousVolumes[symbol] && currentVolume >= minvol) {
                    const timeInHungary = new Date(currentCandle[0]).toLocaleTimeString('en-HU', { timeZone: 'Europe/Budapest', hour12: false });
                    console.log(`Volume surge detected for ${symbol} at ${timeInHungary}`);
                }

                // Update the previous volume for the next comparison
                previousVolumes[symbol] = currentVolume;
            }
        }
    }, 600000); // Check every 5 minutes (300000 ms)
}

// Start monitoring
monitorVolumeSurges();
