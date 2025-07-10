// server.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Foretoken backend server is running successfully.' });
});

// Add your actual routes here (e.g., /api/data, /webhook, etc.)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
