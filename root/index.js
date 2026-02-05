#!/bin/bash

# Initialize a new Git repository
git init SupportSphere

# Navigate into the project directory
cd SupportSphere || { echo "Failed to enter directory"; exit 1; }

# Create the initial directory structure
mkdir -p src/{components,pages,styles,lib} && mkdir -p prisma && mkdir -p scripts

# Create a README file
echo "# SupportSphere" > README.md

# Create a .gitignore file
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
echo "build/" >> .gitignore

# Initialize a package.json file
npm init -y

# Install necessary dependencies
npm install next react react-dom prisma @prisma/client redis openai

# Create a basic Prisma schema
echo "generator client {
  provider = \"prisma-client-js\"
}

datasource db {
  provider = \"postgresql\"
  url      = env(\"DATABASE_URL\")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}" > prisma/schema.prisma

# Create a basic Next.js page
echo "export default function Home() {
  return <h1>Welcome to SupportSphere</h1>
}" > src/pages/index.js

# Create a basic Redis connection script
echo "const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = client;" > src/lib/redisClient.js

# Create a basic OpenAI client script
echo "const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;" > src/lib/openaiClient.js

# Create a basic environment variable file
echo "DATABASE_URL=your_database_url_here
OPENAI_API_KEY=your_openai_api_key_here" > .env

# Add all files to git
git add .

# Commit the initial setup
git commit -m "Initial project setup for SupportSphere"