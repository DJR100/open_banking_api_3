# Open Banking API 3

Gambling Spend Demo (Hackathon v1)

Quickstart

- Install deps:

  npm i

- Create `.env.local`:

  PLAID_CLIENT_ID=69032b6c8452e70020cf107a
  PLAID_SANDBOX_SECRET=49314ca5a4972398fe8eb5d8245d10

- Dev:

  npm run dev

- Visit http://localhost:3000

Notes

- Connect via Plaid Sandbox or upload CSV.
- Data is stored in-process only; refresh clears it.
- CSV spend: negatives are debits; gambling detected via MCC 7995, PFC/category includes "Gambling", or keyword regex.

## Getting Started

- Clone (SSH):
  ```bash
  git clone git@github.com:DJR100/open_banking_api_3.git
  cd open_banking_api_3
  ```
- Branching workflow:
  ```bash
  git checkout -b feature/short-description
  # commit changes
  git push -u origin feature/short-description
  ```

## Project Setup (choose your stack later)

- If using Python:
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -U pip
  # pip install -r requirements.txt
  ```
- If using Node.js:
  ```bash
  # nvm use --lts
  npm init -y
  # npm install
  ```

## Repo Notes

- `.gitignore` includes common entries for macOS, Python, Node, IDEs, and environment files.
- Keep secrets in `.env` (never commit). Provide safe defaults in `.env.example`.

## Next Steps

- Decide stack (e.g., Python FastAPI or Node/TypeScript) and add a basic app skeleton.
- Add CI (GitHub Actions), code formatting, and linting.
- Document local run instructions and API endpoints.

## License

TBD.


