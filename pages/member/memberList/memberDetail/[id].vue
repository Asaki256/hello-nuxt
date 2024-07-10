<script setup lang="ts">
import type { Member } from "@/interfaces";

const PAGE_TITLE = "会員詳細情報〜(^^)";

definePageMeta({
  layout: "member",
  middleware: ["loggedin-check"],
});

useHead({
  title: PAGE_TITLE,
});

// ルートオブジェクト取得
const route = useRoute();
const {
  data: responseData,
  pending,
  error,
} = useLazyFetch(`/member-management/members/${route.params.id}`, {
  key: `/member-management/members/${route.params.id}`,
});
const member = computed((): Member | undefined => {
  // レスポンスデータの、undefinedでない配列の0番目
  return responseData.value?.data[0];
});

// 会員情報リストをステートから取得
// const memberList = useState<Map<number, Member>>("memberList");

// const member = computed((): Member => {
//   const id = Number(route.params.id);
//   return memberList.value.get(id) as Member;
// });

const localNote = computed((): string => {
  let localNote = "--";
  if (member.value != undefined && member.value.note != undefined) {
    localNote = member.value.note;
  }
  // if (member.value.note != undefined) {
  //   localNote = member.value.note;
  // }
  return localNote;
});
const isEmptyList = computed((): boolean => {
  return responseData.value?.data.length == 0;
});
const noServerError = computed((): boolean => {
  let returnVal = false;
  if (error.value == null && responseData.value != null && responseData.value.result == 1) {
    returnVal = true;
  }
  console.log(`noServerError: ${returnVal}, asyncData: ${JSON.stringify(responseData.value)}`);
  return returnVal;
});
</script>

<template>
  <section>
    <h2>{{ PAGE_TITLE }}</h2>
    <p v-if="pending">データ取得中😘~♡ 😐</p>
    <template v-else>
      <template v-if="noServerError">
        <p v-if="isEmptyList">指定された会員情報は存在しません。</p>
        <dl v-else>
          <dt>ID</dt>
          <dd>{{ member?.id }}</dd>
          <dt>名前</dt>
          <dd>{{ member?.name }}</dd>
          <dt>メールアドレス</dt>
          <dd>{{ member?.email }}</dd>
          <dt>保有ポイント</dt>
          <dd>{{ member?.points }}</dd>
          <dt>備考</dt>
          <dd>{{ localNote }}</dd>
        </dl>
      </template>
      <p v-else>サーバからデータ取得中に障害が発生してもーたー</p>
    </template>
  </section>
</template>
