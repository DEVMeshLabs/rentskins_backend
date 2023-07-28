export interface ITransactionRepositoryRequest {
  owner_id: string;
  total: number;
  payment_type: any;
  installments: number;
  transaction_id: string;
  processor_response: string;
  customer_mobile: string;
  customer_email: string;
  customer_document: string;
  customer_name: string;
  billing_address: string;
  billing_city: string;
  billing_neighborhood: string;
  billing_number: string;
  billing_zip_code: string;
  billing_state: string;
  credit_cart_Number: string;
  credit_cart_Holder_name: string;
  credit_cart_Expiration: string;
  credit_cart_Cvv: string;
}
