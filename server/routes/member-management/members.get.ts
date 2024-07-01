import type {Member, ReturnJSONMembers} from "@/interfaces";

export default defineEventHandler(async(event):Promise<ReturnJSONMembers>=> {
  // 空の会員リストのMapオブジェクト生成
  let memberList = new Map<number, Member>();
  let resultVal = 0;

  // throw createError("普通のエラー");
  try {
    // ローカルストレージから会員リストを取得
    const storage = useStorage();
    // throw createError("擬似エラー発生")
    const memberListStorage = await storage.getItem("local:member-management_members");
    // ローカルストレージから取得できた場合はMapオブジェクトに変換
    if(memberListStorage != undefined){
      // Nuxtではstorage.getItemで取得した値は文字列でなくJSON形式で返されるため、変換の手間が減っている
      // anyで変換する前はStorageValueで返されるため、anyで強制的にMapに変換する
      memberList = new Map<number, Member>(memberListStorage as any);
    }
      resultVal = 1;
  } catch(err) {
    console.log(err);
  }
  // Mapオブジェクトから値のみを取得
  const memberListValues = memberList.values();
  // Mapオブジェクトから配列に変換
  const memberListArray = Array.from(memberListValues);
  // 取得した会員リストを返す
  return {
    result: resultVal,
    data: memberListArray,
  }
})