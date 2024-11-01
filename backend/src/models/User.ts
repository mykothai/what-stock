import Mongoose from 'mongoose'

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 1,
    unique: true,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
})

export const UserModel = Mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserById = (id: string) => UserModel.findById(id)
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUser = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ _id: id }, values)

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  })
