<script setup lang="ts">
// 天気APIのAPIキーへのURL
// https://home.openweathermap.org/api_keys
// APIKey: 6abde7b29586ba11ec133c6cf457c334

// 姫路の情報
// https://api.openweathermap.org/data/2.5/weather?lang=ja&q=Himeji&appid=6abde7b29586ba11ec133c6cf457c334

import type { Member } from "@/interfaces";
import type { City } from "@/interfaces";

useState<Map<number, City>>("cityList", (): Map<number, City> => {
  const cityListInit = new Map<number, City>();
  cityListInit.set(1853909, {
    id: 1853909,
    name: "大阪",
    q: "Osaka",
  });
  cityListInit.set(1859171, {
    id: 1859171,
    name: "神戸",
    q: "Kobe",
  });
  cityListInit.set(1862627, {
    id: 1862627,
    name: "姫路",
    q: "Himeji",
  });
  return cityListInit;
});

const SITE_TITLE = "サーバストレージサンプル";
useHead({
  titleTemplate: (titleChunk: string | undefined): string => {
    let title = SITE_TITLE;
    if (titleChunk != undefined) {
      title = `${titleChunk} | ${SITE_TITLE}`;
    }
    return title;
  },
});

useState<Map<number, Member>>("memberList", (): Map<number, Member> => {
  const memberListInit = new Map<number, Member>();
  memberListInit.set(12345, {
    id: 12345,
    name: "田中太郎",
    email: "tenaka@tews.com",
    points: 32,
    note: "初回特典あり",
  });
  memberListInit.set(23456, {
    id: 23456,
    name: "田中次郎",
    email: "tenaka2@tews.com",
    points: 46,
  });
  return memberListInit;
});

const asyncData = useNuxtData("/WeatherInfo/1862627");
</script>

<template>
  <header>
    <h1>{{ SITE_TITLE }}</h1>
    <p>{{ asyncData.data }}</p>
  </header>
  <main>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<style>
main {
  border: blue 1px solid;
  padding: 10px;
}
#breadcrumbs ul li {
  display: inline;
  list-style-type: none;
}
#breadcrumbs {
  margin-left: 0px;
}
#breadcrumbs ul {
  padding-left: 0px;
}
#breadcrumbs ul .current {
  color: red;
}
#breadcrumbs ul li:before {
  content: " > ";
}
#breadcrumbs ul li:first-child:before {
  content: none;
}
</style>

<!-- <script setup lang="ts">
// const widthInit = Math.round(Math.random() * 10);
// const heightInit = Math.round(Math.random() * 10);
// const rectangle = reactive({
//   width: widthInit,
//   height: heightInit
// });
// // const width = ref(widthInit);
// // const height = ref(heightInit);
// const area = computed(
//   (): number => {
//     return rectangle.width * rectangle.height;
//   }
// );
// setInterval(
//   ():void => {
//     rectangle.width = Math.round(Math.random() * 20);
//     rectangle.height = Math.round(Math.random() * 20);
//   },
//   1000
// );

const msg = ref("まだ");
const onButtonClick = (label: string, event: Event): void => {
  const target = event.target as HTMLButtonElement;
  const text = target.innerText;
  msg.value = `${label}と${text}`;
};

const memberListInit = new Map<number, Member>();
memberListInit.set(33456, {
  id: 33456,
  name: "田中じろう",
  email: "jtanaka4444@test.com",
  points: 55,
  note: "初回入会特典あり",
});

memberListInit.set(45677, {
  id: 44567,
  name: "武蔵小次郎",
  email: "kmusashi3425@test.com",
  points: 42,
});
const memberList = ref(memberListInit);

const totalPoints = computed((): number => {
  let total = 0;
  for (const member of memberList.value.values()) {
    total += member.points;
  }
  return total;
});

const onIncrementPoint = (id: number): void => {
  const member = memberList.value.get(id);
  if (member != undefined) {
    member.points++;
  }
};

interface Member {
  id: number;
  name: string;
  email: string;
  points: number;
  note?: string;
}
</script>

<template>

  <p>{{ msg }}</p>
  <button @click="onButtonClick('Hello!', $event)">こんにてぃは</button>

  <section>
    <h1>コンポーネント基礎</h1>
    <OneSection />
    <OneSection />
    <PartsTheSupplement />
  </section>

  <section>
    <h1>会員リスト</h1>
    <p>全会員の保有ポイント合計: {{ totalPoints }}</p>
    <OneMember
      v-for="[id, member] in memberList"
      :key="id"
      :id="id"
      :name="member.name"
      :email="member.email"
      :points="member.points"
      :note="member.note"
      @incrementPoint="onIncrementPoint"
    />
  </section>
</template> -->
