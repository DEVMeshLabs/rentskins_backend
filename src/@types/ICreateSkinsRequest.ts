export interface CreateSkinsUseCaseRequest {
  skin_image: string;
  skin_name: string;
  skin_category: string;
  skin_weapon: string;
  skin_price: string;
  skin_float: string;
  skin_color: string;
  skin_link_game: string;
  skin_link_steam: string;
  seller_name: string;
  seller_id: string;
  buyer_name?: string;
  buyer_id?: string;
  status: string;
  status_float: string;
  sale_type: string;
}
