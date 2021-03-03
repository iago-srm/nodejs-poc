import express from 'express';
import { json } from 'body-parser';
import "dotenv-safe/config";

const app = express();
app.use(json());

app.get('/user', (_, res) => {
  res.send('Hi there!');
});

app.listen(parseInt(process.env.PORT), () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
