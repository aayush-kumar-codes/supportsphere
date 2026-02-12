# README.md

# SupportSphere Project

## Overview
SupportSphere is a web application designed to provide support services using advanced AI capabilities.

## Tech Stack
- Node.js
- Next.js
- PostgreSQL
- Prisma
- Redis
- OpenAI Agent SDK

## Directory Structure
/support-sphere
|-- /src
|   |-- /components
|   |-- /pages
|   |-- /styles
|   |-- /utils
|-- /prisma
|   |-- schema.prisma
|-- /redis
|-- /scripts
|-- .env
|-- package.json
|-- README.md
## Installation

1. Clone the repository:
   git clone <repository-url>
   cd support-sphere
   2. Install dependencies:
   npm install
   3. Set up environment variables in the `.env` file.

4. Run the application:
   npm run dev
   ## Database Setup
1. Ensure PostgreSQL is running.
2. Run Prisma migrations:
   npx prisma migrate dev --name init
   ## Redis Setup
1. Ensure Redis is running.

## Contributing
Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.