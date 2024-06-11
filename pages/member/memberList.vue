<script setup lang="ts">
import type { Member } from "@/interfaces";
// import type { NuxtLink } from "#build/components";
const PAGE_TITLE = "会員リスト！";
definePageMeta({
  layout: "member",
  // layout: false,
});
useHead({
  title: PAGE_TITLE,
});

// ステートから会員リストを取得
const memberList = useState<Map<number, Member>>("memberList");
</script>

<template>
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink :to="{ name: 'index' }">TOP</NuxtLink></li>
      <li>{{ PAGE_TITLE }}</li>
    </ul>
  </nav>
  <section>
    <h2>{{ PAGE_TITLE }}</h2>
    <p>新規登録は<NuxtLink :to="{ name: 'member-memberList-memberAdd' }">こちら</NuxtLink></p>
    <section>
      <ul>
        <li v-for="[id, member] in memberList" :key="id">
          <NuxtLink :to="{ name: 'member-memberList-memberDetail-id', params: { id: id } }">
            IDが{{ id }}の{{ member.name }}さん
          </NuxtLink>
        </li>
      </ul>
    </section>
    <NuxtPage />
  </section>
</template>
