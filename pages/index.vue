<script setup lang="ts">
import type { City } from "@/interfaces";

// ステートから都市情報取得
const cityList = useState<Map<number, City>>("cityList");
</script>

<template>
  <h1>TOP</h1>
  <nav id="breadcrumbs">
    <ul>
      <li>TOP</li>
    </ul>
  </nav>
  <section>
    <h2>都市リスト</h2>
    <ul>
      <li v-for="[id, city] in cityList" :key="id">
        <NuxtLink :to="{ name: 'WeatherInfo-id', params: { id: id } }">
          {{ city.name }}の天気
        </NuxtLink>
      </li>
    </ul>
  </section>
  <section>
    <p>
      <NuxtLink :to="{ name: 'member-memberList' }"> 会員管理はこちら</NuxtLink>
    </p>
  </section>
</template>
