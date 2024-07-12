import express from 'express';
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

import { config } from "dotenv";
config();

const port = process.env.PORT;

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
