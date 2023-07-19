import axios from "axios";

const getQuote = async () => {
  const options = {
    method: "GET",
    url: "https://twelve-data1.p.rapidapi.com/price",
    params: {
      symbol: "GME",
      format: "json",
      outputsize: "30",
    },
    headers: {
      "X-RapidAPI-Key": "1c8bce9d54msh8cbc95c564f2621p11f793jsnd17079bce2af",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getQuote;
