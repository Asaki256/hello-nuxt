<script setup lang="ts">
import type { Member } from "@/interfaces";

// ルータオブジェクト
const router = useRouter();
// 会員情報リスト
const memberList = useState<Map<number, Member>>("memberList");
// リアクティブな入力用Member
const member: Member = reactive({
  id: 0,
  name: "",
  email: "",
  points: 0,
  note: "",
});
// フォームサブミット時のメソッド
const onAdd = (): void => {
  memberList.value.set(member.id, member);
  router.push({ name: "member-memberList" });
};
</script>

<template>
  <section>
    <h2>会員情報追加</h2>
    <p>情報を入力し、登録ボタンをクリック！</p>
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
  </section>
</template>
