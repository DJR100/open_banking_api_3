import type { NextApiRequest, NextApiResponse } from 'next';
import { plaid } from './_plaid';
import { setAccessToken } from '@/lib/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { public_token } = req.body as { public_token: string };
    const resp = await plaid.itemPublicTokenExchange({ public_token });
    setAccessToken(resp.data.access_token);
    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}


