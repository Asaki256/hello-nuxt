<script setup lang="ts">
const onResetButtonClick = (error: Ref) => {
  error.value = null;
};
</script>

<template>
  <!-- NuxtErrorBoundaryで囲んだとこでエラーキャッチできるよ -->
  <NuxtErrorBoundary>
    <ErrorGeneratorBasic />
    <p>テストコメント</p>
    <!-- NuxtErrorBoundaryの子要素にtemplateを配置してv-slotでerrorを受け取ることで表示も可能！ -->
    <template v-slot:error="errorProps">
      <p>エラー発生した！</p>
      <p>{{ errorProps.error }}</p>
      <button @click="onResetButtonClick(errorProps.error)">エラーを解消</button>
    </template>
  </NuxtErrorBoundary>
  <p>
    <NuxtLink :to="{ name: 'index' }"> 戻る</NuxtLink>
  </p>
</template>
