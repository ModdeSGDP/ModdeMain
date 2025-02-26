import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    const uri = config.get<string>('MONGO_URI'); // ✅ Correctly getting the value

    console.log('Loaded MONGO_URI:', uri); // Debugging line to check if it's loaded

    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    return { uri };
  },
  inject: [ConfigService],
};
