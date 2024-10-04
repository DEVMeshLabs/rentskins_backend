export interface IGetProfileInterface {
  id: string;
  owner_id: string;
  owner_name: string;
  owner_type: string;
  owner_country: string | null;
  account_status: string;
  status_member?: string | null;
  steam_level: number;
  steam_url: string;
  steam_created_date: Date;
  picture: string;
  delivery_time: string | null;
  delivery_fee?: number;
  total_exchanges: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
