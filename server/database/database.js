// import statement
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({path: 'info.env'})
mongoose.set('strictQuery', false)

// Initialization
const STRING = process.env.STRING
// console.log(`STRING: ${STRING}`);

// Db connection function
export const connectDb = async () => {
    try {
        const con = await mongoose.connect(STRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        })
        console.log(`MongoDb Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDb: ${error}`);
    }
}


