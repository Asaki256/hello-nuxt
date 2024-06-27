<script setup lang="ts">
const onThrowErrorClick = (): void => {
  throw createError({
    message: "致命的な擬似エラー発生！",
    // statusCode: 404,
    fatal: true,
    statusMessage: "ステータスメッセージ。果たしてこれはどこに配置されるのか。",
  });
};
</script>

<template>
  <section>致命的なエラーを<button @click="onThrowErrorClick">発生</button></section>
</template>
