import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'], // Unique index. If you specify `unique: true`, the second argument is a custom error message.
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        require: [true, 'Username is required'],
        match: [ /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/ , "Username is invalid, it should contain 8-20 alphanumeric characters, no special characters and be unique"],
        unique: [true, 'Username already exists'],
    },
    image: {
        type: String,
    }
});

// If the model User has already been compiled, Mongoose will return it. Otherwise, Mongoose will compile the model and return it.
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
// models is a dictionary of all your models, so you can use it to check if a model exists before defining it
// this to prevent OverwriteModelError: Cannot overwrite `User` model once compiled.
// ensures that the existing model is reused