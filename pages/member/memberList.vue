<script setup lang="ts">
import type OneMember from "~/components/OneMember.vue";

import type { Member } from "@/interfaces";

// ステートから会員リストを取得
const memberList = useState<Map<number, Member>>("memberList");
</script>

<template>
  <h1>会員管理</h1>
  <nav id="breadcrumbs">
    <ul>
      <li>TOP</li>
      <li>会員リスト</li>
    </ul>
  </nav>
  <section>
    <h2>会員リスト</h2>
    <p>新規登録はこちら</p>
    <section>
      <ul>
        <li v-for="[id, member] in memberList" :key="id">idが{{ id }}の{{ member.name }}さん</li>
      </ul>
    </section>
  </section>
</template>
