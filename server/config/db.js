import mongoose from 'mongoose';

export const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tattva_tech_db';

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: Could not connect to primary database (${primaryUri.split('@').pop()}).`);
    console.error(`Reason: ${error.message}`);

    // If Atlas connection failed (e.g. IP whitelist / network issue), attempt fallback to local MongoDB
    if (primaryUri.includes('mongodb+srv://') || !primaryUri.includes('127.0.0.1')) {
      console.log('[Notice]: Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/tattva_tech_db)...');
      try {
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/tattva_tech_db', {
          serverSelectionTimeoutMS: 4000,
        });
        console.log(`[MongoDB Connected via Local Fallback]: ${localConn.connection.host}/${localConn.connection.name}`);
        return localConn;
      } catch (localErr) {
        console.error(`[Local MongoDB Fallback Error]: ${localErr.message}`);
      }
    }
  }
};
