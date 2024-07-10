<script setup lang="ts">
import type { Member } from "@/interfaces";

const PAGE_TITLE = "会員情報を追加するお";
definePageMeta({
  layout: "member",
  middleware: ["loggedin-check"],
});
useHead({
  title: PAGE_TITLE,
});
// ルータオブジェクト
const router = useRouter();
// 会員情報リスト
// const memberList = useState<Map<number, Member>>("memberList");

// リアクティブな入力用Member
const member: Member = reactive({
  id: 0,
  name: "",
  email: "",
  points: 0,
  note: "",
});
const pending = ref(false);
// サーバエラーがない状態 = true
const noServerError = ref(true);

const onAdd = async (): Promise<void> => {
  pending.value = true;
  const asyncData = await useFetch("/member-management/members", {
    method: "POST",
    body: member,
  });

  // TSの型チェックサンプルのために追加
  var numberOrString = Math.random() < 0.5 ? "hello" : 100;
  console.log(`numberOrString type: ${typeof numberOrString}`);
  var typeAssertedNumber = /** @type {number} */ numberOrString;
  console.log(`typeAssertedNumber type: ${typeof typeAssertedNumber}`);

  if (
    asyncData.error.value == null &&
    asyncData.data.value != null &&
    asyncData.data.value.result == 1
  ) {
    router.push({ name: "member-memberList" });
  } else {
    pending.value = false;
    noServerError.value = false;
  }
};
// フォームサブミット時のメソッド
// const onAdd = (): void => {
//   memberList.value.set(member.id, member);
//   router.push({ name: "member-memberList" });
// };
</script>

<template>
  <section>
    <h2>{{ PAGE_TITLE }}</h2>
    <p v-if="pending">データ送信中！</p>
    <template v-else>
      <p v-if="noServerError">情報を入力し、登録ボタンをクリックしろーッ！</p>
      <p v-else>サーバ処理中に障害が発生しました！もう一回登録したら送れるかも</p>
      <form @submit.prevent="onAdd">
        <dl>
          <dt>
            <label for="addId">ID&nbsp;</label>
          </dt>
          <dd>
            <input type="number" id="addId" v-model.number="member.id" required />
          </dd>
          <dt>
            <label for="addName">名前&nbsp;</label>
          </dt>
          <dd>
            <input type="text" id="addName" v-model="member.name" required />
          </dd>
          <dt>
            <label for="addEmail">メルアド&nbsp;</label>
          </dt>
          <dd>
            <input type="email" id="addEmail" v-model="member.email" required />
          </dd>
          <dt>
            <label for="addPoints">保有ポイント&nbsp;</label>
          </dt>
          <dd>
            <input type="number" id="addPoints" v-model.number="member.points" required />
          </dd>
          <dt>
            <label for="addNote">備考&nbsp;</label>
          </dt>
          <dd>
            <textarea id="addNote" v-model="member.note"></textarea>
          </dd>
        </dl>
        <button type="submit">登録！</button>
      </form>
    </template>
  </section>
</template>
