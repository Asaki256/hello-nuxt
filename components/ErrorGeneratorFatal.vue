<script setup lang="ts">
const onThrowErrorClick = (): void => {
  throw createError({
    message: "致命的な擬似エラー発生！",
    fatal: true,
  });
};
</script>

<template>
  <section>致命的なエラーを<button @click="onThrowErrorClick">発生</button></section>
</template>
