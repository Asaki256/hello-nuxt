export interface Member {
  id: number;
  name: string;
  email: string;
  points: number;
  note?: string;
}
export interface City {
  id: number;
  name: string;
  q: string;
}

export interface WeatherInfoData {
  cityName: string;
  description: string;
}

export interface ReturnJSONMembers {
  result: number;
  data: Member[];
}

export interface User {
  id: number;
  name: string;
  loginId: string;
  password: string;
}
// サーバAPIエンドポイントでは、認証失敗時にtokenを空文字、userをnullにする
export interface ReturnJSONAuth {
  result: number;
  token: string;
  user: User|null;
}