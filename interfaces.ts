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