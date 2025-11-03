import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Files } from 'formidable';
import fs from 'node:fs';
import os from 'node:os';
import { parse } from 'csv-parse/sync';
import { setOverrideTransactions } from '@/lib/store';

export const config = {
  api: { bodyParser: false },
};

function pick<T = any>(obj: any, keys: string[]): T | null {
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
  }
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new IncomingForm({ multiples: false, uploadDir: os.tmpdir(), keepExtensions: true });
    const { files } = await new Promise<{ fields: any; files: Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
    });

    const f: any = Array.isArray((files as any).file) ? (files as any).file[0] : (files as any).file;
    const filepath: string | undefined = f?.filepath || f?.filepath || f?.path;
    if (!filepath) {
      res.status(400).send('Invalid CSV upload');
      return;
    }

    const raw = fs.readFileSync(filepath, 'utf8');
    const records: any[] = parse(raw, { columns: true, skip_empty_lines: true });

    const txns = records.map((r, i) => {
      const dateRaw = pick(r, ['date', 'Date', 'posted', 'Posting Date', 'Transaction Date']);
      const dateStr = String(dateRaw || '').slice(0, 10);
      const amountRaw = pick(r, ['amount', 'Amount', 'value', 'Value', 'Transaction Amount']);
      const merchantRaw = pick(r, ['merchant_name', 'Merchant', 'Description', 'Name', 'Narrative', 'Details']);
      const mccRaw = pick(r, ['mcc', 'MCC']);
      const catRaw = pick(r, ['category', 'Category']);
      const pfcRaw = pick(r, ['pfc', 'Personal Finance Category']);
      const currencyRaw = pick(r, ['currency', 'Currency']) || 'GBP';
      const timeRaw = pick(r, ['time', 'Time', 'Transaction Time']);

      const amtNum = Number(String(amountRaw || '0').replace(/,/g, ''));
      const cat: string[] =
        typeof catRaw === 'string'
          ? catRaw.split(/[>,]/).map(s => s.trim()).filter(Boolean)
          : Array.isArray(catRaw)
          ? catRaw
          : [];

      let datetime: string | null = null;
      if (dateStr && timeRaw) {
        const tClean = String(timeRaw).trim();
        const maybeIso = new Date(`${dateStr} ${tClean}`);
        if (!isNaN(maybeIso.getTime())) {
          datetime = maybeIso.toISOString();
        }
      }

      return {
        id: r.id || r.transaction_id || `csv-${i}-${dateStr}`,
        date: dateStr,
        datetime,
        amount: isFinite(amtNum) ? amtNum : 0,
        merchant_name: String(merchantRaw || 'Unknown'),
        mcc: mccRaw ? String(mccRaw) : null,
        category: cat,
        pfc: pfcRaw ? String(pfcRaw) : null,
        currency: String(currencyRaw || 'GBP'),
        _source: 'csv',
      };
    });

    setOverrideTransactions(txns);

    try { fs.unlinkSync(filepath); } catch {}

    // Redirect to loading (then dashboard)
    res.writeHead(303, { Location: '/loading' });
    res.end();
  } catch (e: any) {
    res.status(400).send('Invalid CSV format');
  }
}


