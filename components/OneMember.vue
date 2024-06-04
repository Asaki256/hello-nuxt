<script setup lang="ts">
import type { Member } from "@/interfaces";
// Props interface
interface Props {
  id: number;
}

// Emits型の定義
// type Emits = {
//   incrementPoint: [id: number];
// };

const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
const memberList = useState<Map<number, Member>>("memberList");
const member = memberList.value.get(props.id) as Member;

const localNote = computed((): string => {
  let localNote = member.note;
  if (localNote == undefined) {
    localNote = "--";
  }
  return localNote;
});

// const localPoints = ref(props.points);
// const localName = computed((): string => {
//   let localNote = props.note;
//   if (localNote == undefined) {
//     localNote = "--";
//   }
//   return localNote;
// });

const pointUp = (): void => {
  member.points++;
  // localPoints.value++;
  // emit("incrementPoint", props.id);
};
</script>

<template>
  <section class="box">
    <h4>{{ member.name }}さんの情報</h4>
    <dl>
      <dt>ID</dt>
      <dd>{{ id }}</dd>
      <dt>メアド</dt>
      <dd>{{ member.email }}</dd>
      <dt>保有ポイント</dt>
      <dd>{{ member.points }}</dd>
      <dt>備考</dt>
      <dd>{{ localNote }}</dd>
    </dl>
    <button v-on:click="pointUp">ポイント加算</button>
  </section>
</template>

<style scoped>
.box {
  border: green 1px solid;
  margin: 10px;
}
</style>
