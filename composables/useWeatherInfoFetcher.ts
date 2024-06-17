import type {City} from "@/interfaces";

export const useWeatherInfoFetcher = (city: City) => {
  const asyncData = useLazyAsyncData(
    `useWeatherInfoFetcher-${city.id}`,
    (): Promise<any> => {
      const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
      const params: {
        lang: string;
        q: string;
        appid: string;
      } = {
        lang: "ja",
        q: city.q,
        appid: "6abde7b29586ba11ec133c6cf457c334",
      };
      const queryParams = new URLSearchParams(params);
      const urlFull = `${weatherInfoUrl}?${queryParams}`;
      const response = $fetch(urlFull);
      return response;
    },
    {
      transform: (data): string => {
        const weatherArray = data.weather;
        const weather = weatherArray[0];
        return weather.description;
      },
    }
  );
  return asyncData;
};