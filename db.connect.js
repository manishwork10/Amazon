import mongoose from 'mongoose'

const dbConnect= async() => {
    try{
        await mongoose.connect(
            "mongodb+srv://manishwork110:o6kfmVzvQBVdMY0R@cluster0.uvrta6e.mongodb.net/amazon?retryWrites=true&w=majority&appName=Cluster0"
        )
        console.log("DB connected successfully to manishwork db.")
    }
    catch(error){
        console.log("DB couldn't connected successfully .")
        console.log(error.message);

    }
}

export default dbConnect;