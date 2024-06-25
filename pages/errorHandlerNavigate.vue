<script setup lang="ts">
const onResetButtonClick = async (error: Ref): Promise<void> => {
  // navigateTo関数はasync関数
  // 戻り値もPromiseになる
  // 引数として遷移先パスを指定
  await navigateTo("/");
  // ページ遷移処理をした後にerror.valueをnullにする
  // 逆にするとエラーが無限ループする恐れがある
  error.value = null;
};
</script>

<template>
  <NuxtErrorBoundary>
    <ErrorGeneratorImmediate />
    <template v-slot:error="errorProps">
      <p>エラー発生しますた</p>
      <p>{{ errorProps.error }}</p>
      <button @click="onResetButtonClick(errorProps.error)">エラーを解消する</button>
    </template>
  </NuxtErrorBoundary>
</template>
