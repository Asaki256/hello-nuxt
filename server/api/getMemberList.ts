import type {Member} from "@/interfaces";
import {createMemberList} from "@/membersDB";

// サーバAPIエンドポイントの処理コードは、
// defineEventHandler（）をデフォルトエクスポートする必要がある
export default defineEventHandler(
  (event): Member[] => {
    // 会員リストMapオブジェクト生成
    const memberList = createMemberList();
    // Mapオブジェクトの値を取得
    const memberListValues = memberList.values();
    // 配列に変換
    const memberListArray = Array.from(memberListValues);
    // 配列を返す
    return memberListArray;
  }
)