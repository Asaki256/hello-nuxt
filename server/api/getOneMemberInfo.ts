import type { Member } from "@/interfaces";
import {createMemberList} from "@/membersDB";

export default defineEventHandler((event): Member => {
  const query = getQuery(event);
  // DBから会員リスト情報Mapを取得
  const memberList = createMemberList();
  const idNo = Number(query.id);
  const member = memberList.get(idNo) as Member;
  return member;
});