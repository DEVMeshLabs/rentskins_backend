export interface IUpdateConfigurationUseCaseRequest {
  owner_name?: string;
  owner_id?: string;
  owner_email?: string;
  url_trade?: string;
  url_sell?: string;
  agreed_with_emails?: boolean;
  agreed_with_terms?: boolean;
  steam_guard?: boolean;
}
