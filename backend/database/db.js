import { connect } from "mongoose";

const connectToMongo = async () => {

  try {
    await connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.yolmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`);



    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;