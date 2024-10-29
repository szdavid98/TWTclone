import axios from 'axios';


// Example usage
const symbol = 'STORJUSDT'; // Specify the symbol
const startTime = Date.parse('2024-08-01T00:00:00Z'); // Start time in milliseconds
const endTime = Date.parse('2024-10-19T00:00:00Z'); // End time in milliseconds

function roundTo(value,decimals){
    const factor = Math.pow(10,decimals)
    const rounded = Math.round(value * factor)
    return rounded / factor
}

async function getFuturesCandleClose(symbol, time) {
    const interval = '5m';
    const startTime = time;
    const endTime = startTime + 5 * 60 * 1000;

    try {
        const response = await axios.get('https://fapi.binance.com/fapi/v1/klines', {
            params: {
                symbol,
                interval,
                startTime,
                endTime,
                limit: 1 // Only need one candle
            }
        });

        const candle = response.data[0];
        if (candle) {
            const closePrice = candle[4]; // Closing price is at index 4
            return closePrice;
        } else {
            console.log('No candle data found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getFundingRateHistory(symbol, startTime, endTime, limit = 1000) {
    const url = 'https://fapi.binance.com/fapi/v1/fundingRate';
    const params = {
        symbol: symbol,
        startTime: startTime,
        endTime: endTime,
        limit: limit,
    };

    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching funding rate history:', error.message);
        return null;
    }
}



getFundingRateHistory(symbol, startTime, endTime)
    .then(async data => {
        for (const item of data) {
            let date = new Date(item.fundingTime);

            if (parseFloat(item.fundingRate) >= 0.001 || parseFloat(item.fundingRate) < -0.001) {
                const timeFstart = item.fundingTime ;
                const timeEnds  = item.fundingTime + 5 *60 *1000 ;
                const closePriceStart = await getFuturesCandleClose(symbol, timeFstart); // Await the closing price
                const closePriceEnd = await getFuturesCandleClose(symbol, timeEnds); // Await the closing price
                let change 
                if (closePriceEnd > closePriceStart){
                    change = roundTo(((closePriceEnd/closePriceStart)-1)*100,3)

                }
                else{
                    change=-roundTo(((closePriceStart/closePriceEnd)-1)*100,3)
                }
                
                
                console.log(item.symbol, roundTo(parseFloat(item.fundingRate) * 100,3), '%', '-------', date.toLocaleString('en-EN', { timeZone: 'UTC' }),'---->>Indító ár:',closePriceStart,'Záró:', closePriceEnd,change,'%');
            }
        }
    })
    .catch(err => console.error(err));