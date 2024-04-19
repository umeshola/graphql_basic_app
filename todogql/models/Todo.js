import mongoose from 'mongoose'
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

mongoose.model("Todo", todoSchema)