import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw Error("Please Enter a valid Mongodb URI");
}

let cached = global.mongoose;

// creating fresh connection
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    // if there is already connection then return that connection
    if (cached.conn) {
        return cached.conn;
    }

    // if there is no promise then create a new connection
    if (!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then(() => mongoose.connection);
    }

    // if there is a promise already then wait for the promise result
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null
        throw error;
    }

    return cached.conn;
}