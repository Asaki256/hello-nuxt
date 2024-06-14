<script setup lang="ts">
import type { City } from "@/interfaces";

const route = useRoute();

const cityList = useState<Map<number, City>>("cityList");

const selectedCity = computed((): City => {
  const idNo = Number(route.params.id);
  return cityList.value.get(idNo) as City;
});

// const weatherDescription = ref("");

// const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
// const params: {
//   lang: string;
//   q: string;
//   appid: string;
// } = {
//   lang: "ja",
//   q: selectedCity.value.q,
//   appid: "6abde7b29586ba11ec133c6cf457c334",
// };
// const queryParams = new URLSearchParams(params);
// const UrlFull = `${weatherInfoUrl}?${queryParams}`;
// const response = (await $fetch(UrlFull)) as any;
// const weatherArray = response.weather;
// const weather = weatherArray[0];
// weatherDescription.value = weather.description;

const asyncData = await useAsyncData(
  `/WeatherInfo/${route.params.id}`,
  (): Promise<any> => {
    const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
    const params: {
      lang: string;
      q: string;
      appid: string;
    } = {
      lang: "ja",
      q: selectedCity.value.q,
      appid: "6abde7b29586ba11ec133c6cf457c334",
    };
    const queryParams = new URLSearchParams(params);
    const urlFull = `${weatherInfoUrl}?${queryParams}`;
    const response = $fetch(urlFull);
    return response;
  },
  {
    // pick: ["weather"],
    transform: (data: any): string => {
      const weatherArray = data.weather;
      const weather = weatherArray[0];
      return weather.description;
    },
  }
);
// const data = asyncData.data;
// const weatherArray = data.value.weather;
// const weather = weatherArray[0];
// weatherDescription.value = weather.description;
const weatherDescription = asyncData.data;
</script>

<template>
  <section>
    <h2>{{ selectedCity.name }}の天気</h2>
    <p>{{ weatherDescription }}</p>
  </section>
  <p>リストに<NuxtLink :to="{ name: 'index' }">戻る</NuxtLink></p>
</template>
