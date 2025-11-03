# Open Banking API 3

A fresh repository for building an open banking API. This README will evolve as the project structure and tech stack are defined.

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


