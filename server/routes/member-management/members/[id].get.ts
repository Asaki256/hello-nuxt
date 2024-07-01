import type { Member, ReturnJSONMembers } from "@/interfaces";
// import {createMemberList} from "@/membersDB";

export default defineEventHandler(
  async (event): Promise<ReturnJSONMembers> => {
    let resultVal = 0;
    const memberListArray: Member[] = [];

    // throw createError("擬似エラー発生");
    try {
      // パラメータ取得
      const params = event.context.params;
      let memberList = new Map<number, Member>();
      // ストレージからメンバーリスト取得
      const storage = useStorage();
      const memberListStorage = await storage.getItem("local:member-management_members");
      // throw createError("擬似エラー発生");

      // ストレージから取得できた場合
      if(memberListStorage != undefined) {
        // メンバーリストにMapとして代入
        memberList = new Map<number, Member>(memberListStorage as any);
      }
      // パラメータが存在する場合
      if(params != undefined) {
        // パラメータに一致するメンバーを取得して、配列に追加
        const idNo = Number(params.id);
        const member = memberList.get(idNo);
        resultVal = 1;
        if(member != undefined) {
          memberListArray[0] = member;
        }
        // console.log(`resultVal1: ${resultVal}zz`);
      }
    } catch(err) {
      console.log(err);
    }
    // console.log(`resultVal2: ${resultVal}`);
    console.log(`resultVal: ${resultVal}, memberListArray: ${JSON.stringify(memberListArray)}`);
    return {
      result: resultVal,
      // 配列が空か否かで表示を切り替える
      data: memberListArray,
    }
  }
)