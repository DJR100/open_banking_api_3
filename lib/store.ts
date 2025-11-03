// Simple in-memory store. Single-process only (hackathon demo).
let ACCESS_TOKEN: string | null = null;
let OVERRIDE_TXNS: any[] | null = null;

export function setAccessToken(token: string) {
  ACCESS_TOKEN = token;
  // Reset CSV override when linking a bank
  OVERRIDE_TXNS = null;
}
export function getAccessToken() {
  return ACCESS_TOKEN;
}

export function setOverrideTransactions(txns: any[]) {
  OVERRIDE_TXNS = txns;
}
export function getOverrideTransactions() {
  return OVERRIDE_TXNS;
}


