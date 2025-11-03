import type { NextApiRequest, NextApiResponse } from 'next';
import { plaid } from './_plaid';
import { getAccessToken, getOverrideTransactions } from '@/lib/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const csvOverride = getOverrideTransactions();
    if (csvOverride && csvOverride.length) {
      return res.status(200).json({ transactions: csvOverride });
    }

    const access_token = getAccessToken();
    if (!access_token) return res.status(200).json({ transactions: [] });

    const sync = await plaid.transactionsSync({ access_token, count: 500 });
    const txns = (sync.data.added || []).map((t: any) => ({
      id: t.transaction_id,
      date: t.date,
      datetime: (t as any).datetime || t.authorized_datetime || null,
      amount: t.amount, // Plaid: spend positive
      merchant_name: t.merchant_name || t.name,
      mcc: t.merchant_category_code || null,
      category: t.category || [],
      pfc: t.personal_finance_category?.detailed || null,
      currency: t.iso_currency_code || t.unofficial_currency_code || 'GBP',
      _source: 'plaid',
    }));
    res.status(200).json({ transactions: txns });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}


