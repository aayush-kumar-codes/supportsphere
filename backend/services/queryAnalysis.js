import { OpenAIApi, Configuration } from 'openai';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis();
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

export const analyzeCustomerQuery = async (query) => {
  if (!query) {
    throw new Error('Query cannot be empty');
  }

  try {
    const cachedResponse = await redis.get(query);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }],
    });

    const analysis = response.data.choices[0].message.content;

    await redis.set(query, JSON.stringify(analysis), 'EX', 3600); // Cache for 1 hour

    await prisma.queryLog.create({
      data: {
        query,
        analysis,
      },
    });

    return analysis;
  } catch (error) {
    console.error('Error analyzing query:', error);
    throw new Error('Failed to analyze query');
  }
};