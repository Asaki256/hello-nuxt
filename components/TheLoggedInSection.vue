<script setup lang="ts">
import type { User } from "@/interfaces";
const loginUser = useCookie<User | null>("loginUser");
</script>

<template>
  <p>ててて</p>
  <section v-if="loginUser">
    <p>{{ loginUser.name }}さんがログイン中</p>
    <p>テスト</p>
    <p><NuxtLink :to="{ name: 'logout' }">ログアウト</NuxtLink></p>
  </section>
</template>
