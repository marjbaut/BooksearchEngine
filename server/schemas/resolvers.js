const {User, Book} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        // get signle user
        user: async(parent,{userId}) => {
            return User.findOne({_id:userId});
        },
    },

    Mutation:{
        // create a user
        createUser: async (parent, { username, email, password })=>{
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        //  /login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        // save book
        // addBook: async(parent, {title,description},context) =>{
        //     if (context.user){
        //         const book =await Book.create({
        //             title,
        //              description: context.user.username,
        //         });

        //         await User.findOneAndUpdate(
        //             {_id: context.user._id},
        //         );

        //         return book;
        //     }
        //     throw new AuthenticationError('you need to log in');
        // },

    },
};
module.exports = resolvers;