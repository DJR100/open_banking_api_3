import type { NextApiRequest, NextApiResponse } from 'next';
import { plaid } from './_plaid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await plaid.linkTokenCreate({
      user: { client_user_id: 'demo-user-001' },
      client_name: 'Gambling Spend Demo',
      products: ['transactions'],
      country_codes: ['GB'],
      language: 'en',
    });
    res.status(200).json({ link_token: resp.data.link_token });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}


