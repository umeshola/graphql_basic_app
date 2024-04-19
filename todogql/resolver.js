import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const User = mongoose.model("User")
const Todo = mongoose.model("Todo")

const resolvers = {
    Query: {
        me: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You must login NOW!")
            return await User.findById(userId)
        },
        todotrue: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You must login NOW!")
            return await Todo.find({ by: userId, done: false });
        }
    },
    User: {
        todos: async(parent) => {
            return await Todo.find({ by: parent._id });
        }
    },
    Mutation: {
        signup: async(_, { userNew }) => {
            const { email, password } = userNew;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                if (existingUser.password !== password) {
                    throw new Error("Email or password is incorrect");
                }
                const token = jwt.sign({ userId: existingUser._id }, "Umesh");
                return { token };
            } else {
                const newUser = new User({...userNew });
                await newUser.save();
                const token = jwt.sign({ userId: newUser._id }, "Umesh");
                return { token };
            }
        },
        makeTodo: async(_, { name }, { userId }) => {
            if (!userId) throw new Error("You must login NOW!!")
            const newTodo = new Todo({
                name,
                done: false,
                by: userId,
            })
            await newTodo.save()
            return "Todo created!"
        },
        markTrue: async(_, { Id }, { userId }) => {
            if (!userId) throw new Error("You must log in NOW!!");
            const todo = await Todo.findById(Id);
            if (!todo) throw new Error("Todo not found");
            todo.done = true;
            await todo.save();
            return "Todo item updated successfully";
        },
        deleteTodo: async(_, { Id }, { userId }) => {
            if (!userId) throw new Error("You must log in NOW!!");
            const todo = await Todo.findById(Id);
            if (!todo) throw new Error("Todo not found");
            if (todo.by.toString() !== userId) {
                throw new Error("You are not authorized to delete this todo");
            }
            await Todo.deleteOne({ _id: Id });
            return "Todo deleted!!";
        }
    }
}

export default resolvers