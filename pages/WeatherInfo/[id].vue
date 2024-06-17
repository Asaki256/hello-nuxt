<script setup lang="ts">
import type { City, WeatherInfoData } from "@/interfaces";

const route = useRoute();

const cityList = useState<Map<number, City>>("cityList");

const selectedCity = computed((): City => {
  const idNo = Number(route.params.id);
  return cityList.value.get(idNo) as City;
});

// 都市情報リストをステートから取得
// const cityList = useState<Map<number, City>>("cityList");
// 初期都市IDを大阪に設定
// const selectedCityId = ref(1853909);

const asyncData = useWeatherInfoFetcher(selectedCity.value);
const pending = asyncData.pending;
// const data = asyncData.data;
const weatherDescription = asyncData.data;

// const asyncData = await useAsyncData(
//   (): Promise<any> => {
//     const selectedCity = cityList.value.get(selectedCityId.value) as City;
//     const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
//     const params: {
//       lang: string;
//       q: string;
//       appid: string;
//     } = {
//       lang: "ja",
//       q: selectedCity.q,
//       appid: "6abde7b29586ba11ec133c6cf457c334",
//     };
//     const queryParams = new URLSearchParams(params);
//     const urlFull = `${weatherInfoUrl}?${queryParams}`;
//     const response = $fetch(urlFull);
//     return response;
//   },
//   {
//     transform: (data: any): WeatherInfoData => {
//       const weatherArray = data.weather;
//       const weather = weatherArray[0];
//       return {
//         cityName: `${data.name}の天気`,
//         description: weather.description,
//       };
//     },
//     watch: [selectedCityId],
//   }
// );
// const pending = asyncData.pending;
// const data = asyncData.data;

// // 初期都市情報を取得
// const selectedCityInit = cityList.value.get(selectedCityId.value) as City;
// // 都市情報のテンプレート変数
// const selectedCity = ref(selectedCityInit);
// // ここでuseFetchではなくuseAsyncData（）を利用した理由は、
// // useFetchを利用するとパラメータparamsが関数の外になってしまい動作しないため。
// // refreshで関数を再実行する際には関数内の変化するパラメータもその都度することに注意。
// const asyncData = await useAsyncData(
//   (): Promise<any> => {
//     const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
//     const params: {
//       lang: string;
//       q: string;
//       appid: string;
//     } = {
//       lang: "ja",
//       q: selectedCity.value.q,
//       appid: "6abde7b29586ba11ec133c6cf457c334",
//     };
//     const queryParams = new URLSearchParams(params);
//     const urlFull = `${weatherInfoUrl}?${queryParams}`;
//     const response = $fetch(urlFull);
//     return response;
//   },
//   {
//     // pick: ["weather"],
//     transform: (data: any): string => {
//       const weatherArray = data.weather;
//       const weather = weatherArray[0];
//       return weather.description;
//     },
//   }
// );
// const pending = asyncData.pending;
// const weatherDescription = asyncData.data;
// const refresh = asyncData.refresh;

// const onCityChanged = () => {
//   selectedCity.value = cityList.value.get(selectedCityId.value) as City;
//   refresh();
// };

// const weatherDescription = ref("");

// $fetchを用いた長い書き方
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

// useLazyAsyncData()は、レンダリングの後に非同期処理を行うため、
// 画面遷移後に時間差で表示される動作をする。
// そのため、処理が完了するまで待機するawaitキーワードは不要であるため削除。
// const asyncData = useLazyAsyncData(
//   `/WeatherInfo/${route.params.id}`,
//   (): Promise<any> => {
//     const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
//     const params: {
//       lang: string;
//       q: string;
//       appid: string;
//     } = {
//       lang: "ja",
//       q: selectedCity.value.q,
//       appid: "6abde7b29586ba11ec133c6cf457c334",
//     };
//     const queryParams = new URLSearchParams(params);
//     const urlFull = `${weatherInfoUrl}?${queryParams}`;
//     const response = $fetch(urlFull);
//     return response;
//   },
//   {
//     // pick: ["weather"],
//     transform: (data: any): string => {
//       const weatherArray = data.weather;
//       const weather = weatherArray[0];
//       return weather.description;
//     },
//   }
// );

// useFetchを利用した場合の例
// パラメータ（APIに渡すデータ)がある場合は、useFetchメソッドの外側に書く必要があるため、相性が悪い
// ない場合は簡潔に書けるため、臨機応変に使い分ける
// const params: {
//   lang: string;
//   q: string;
//   appId: string;
// } = {
//   lang: "ja",
//   q: selectedCity.value.q,
//   appId: "6abde7b29586ba11ec133c6cf457c334",
// };
// const asyncData = await useFetch("https://api.openweathermap.org/data/2.5/weather", {
//   key: `/WeatherInfo/${route.params.id}`,
//   query: params,
//   transform: (data: any): string => {
//     const weatherArray = data.weather;
//     const weather = weatherArray[0];
//     return weather.description;
//   },
// });

// const data = asyncData.data;
// const weatherArray = data.value.weather;
// const weather = weatherArray[0];
// weatherDescription.value = weather.description;
// const weatherDescription = asyncData.data;
// asyncDataのpendingプロパティ
// boolean型で、
// 対象のasyncDataが取得中の場合： True
// 対象のasyncDataが取得済みの場合： False
// const pending = asyncData.pending;
</script>

<template>
  <!-- <p v-if="pending">データ取得中...a(^o ^)A@@@@...</p>
  <section v-else>
    <h2>{{ selectedCity.name }}の天気</h2>
    <p>{{ weatherDescription }}</p>
  </section>
  <p>リストに<NuxtLink :to="{ name: 'index' }">戻る</NuxtLink></p> -->
  <section>
    <label>
      天気を表示したい地点：
      <!-- <select v-model="route.params.id">
        <option v-for="[id, city] in cityList" :key="id" :value="id"> -->
      {{ selectedCity.name }}
      <!-- </option> -->
      <!-- </select> -->
    </label>
  </section>
  <p v-if="pending">データ取得中...v('v ' )V...</p>
  <section v-else>
    <h2>{{ selectedCity.name }}</h2>
    <p>{{ weatherDescription }}</p>
  </section>
</template>
