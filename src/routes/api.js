import express from 'express';
import { PrismaClient } from '@prisma/client';
import redis from 'redis';
import { OpenAIApi, Configuration } from 'openai';

const router = express.Router();
const prisma = new PrismaClient();
const redisClient = redis.createClient();
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Middleware to handle errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all items
router.get('/items', asyncHandler(async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
}));

// Get item by ID
router.get('/items/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await prisma.item.findUnique({
    where: { id: Number(id) },
  });
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
}));

// Create a new item
router.post('/items', asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const newItem = await prisma.item.create({
    data: { name, description },
  });
  res.status(201).json(newItem);
}));

// Update an item
router.put('/items/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedItem = await prisma.item.update({
    where: { id: Number(id) },
    data: { name, description },
  });
  res.json(updatedItem);
}));

// Delete an item
router.delete('/items/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.item.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
}));

// OpenAI interaction example
router.post('/generate-response', asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
  });
  res.json(response.data.choices[0].text);
}));

export default router;