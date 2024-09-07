export interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

export interface SearchParams {
  keyword: string;
}
