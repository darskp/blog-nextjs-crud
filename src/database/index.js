import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.NEXT_PUBLIC_connnectionURL)
    .then(() => {
        console.log("db connection is successful");
    }).catch((err) => {
        console.log(err)
    })
}
