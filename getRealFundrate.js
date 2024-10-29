import axios from "axios";

async function getFundingRateHistory(symbol, startTime, endTime, limit = 1000) {
    const url = 'https://fapi.binance.com/fapi/v1/premiumIndex';
    /*const params = {
        symbol: symbol,
        startTime: startTime,
        endTime: endTime,
        limit: limit,
    };*/

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching funding rate history:', error.message);
        return null;
    }
}

// Example usage
const symbol = 'BIGTIMEUSDT'; // Specify the symbol
const startTime = Date.parse('2024-01-01T00:00:00Z'); // Start time in milliseconds
const endTime = Date.parse('2024-02-02T00:00:00Z'); // End time in milliseconds

getFundingRateHistory()
    .then(data =>  data.forEach(item =>{
        if (parseFloat(item.lastFundingRate) >= 0.0003 || item.lastFundingRate < -0.0003 ){
            console.log(item)
            /*const calcPremium = (parseFloat(item.markPrice)-parseFloat(item.indexPrice))/parseFloat(item.indexPrice)
            const fundfee = (calcPremium + parseFloat(item.interestRate))/3
            console.log(fundfee*100, 'calculated')*/
        }
        }))
    .catch(err => console.error(err));