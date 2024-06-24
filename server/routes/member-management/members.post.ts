import type {Member, ReturnJSONMembers} from "@/interfaces";

export default defineEventHandler(
  async (event): Promise<ReturnJSONMembers> => {
    const body = await readBody(event);
    const member = body as Member;
    let memberList = new Map<number, Member>();
    const storage = useStorage();
    const memberListStorage = await storage.getItem("local:member-management_members");
    if(memberListStorage != undefined) {
      memberList = new Map<number, Member>(memberListStorage as any);
    }
    memberList.set(member.id, member);
    // memberListに対してスプテッド演算子を適用することで、Mapの各要素を配列に展開する
    // この配列は、インデックス0がキー、インデックス1が値となる配列の配列となる
    // 0, [0: number, 1: Member]
    // 1, [0: number, 1: Member]
    // 2, [0: number, 1: Member]
    // となる
    await storage.setItem("local:member-management_members", [...memberList]);
    return {
      result: 1,
      data: [member],
    }
  }
)