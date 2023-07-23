import axios from "axios";

const getChartData = async (ticker) => {
  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: {
      symbol: ticker,
      interval: '1day',
      outputsize: '31',
      format: 'json'
    },
    headers: {
      'X-RapidAPI-Key': '7fcb2b7132mshabfec755b09ed1fp19c373jsnf3bb9f799b34',
      'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);

  return response.data;
};

export default getChartData;