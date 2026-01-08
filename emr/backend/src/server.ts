import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp } from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/emr';

async function bootstrap() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`EMR backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start backend', err);
    process.exit(1);
  }
}

bootstrap();
