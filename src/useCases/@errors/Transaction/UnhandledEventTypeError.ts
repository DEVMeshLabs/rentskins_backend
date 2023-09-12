export class UnhandLedEventTypeError extends Error {
  constructor(customer: string) {
    super(`Unhandled event type ${customer}`);
  }
}
