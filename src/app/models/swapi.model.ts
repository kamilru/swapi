export interface BaseApiResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: number;
  next: string;
}