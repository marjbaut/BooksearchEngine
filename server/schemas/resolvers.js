const {User, Book} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        // get signle user
        me: async (parent, args, context) => {
          if (context.user){
              const data = await User.findOne({
                  _id: context.user._id
              }).select('-__v -password')
              return data;
          }throw new AuthenticationError("You're not logged in!")
      }

    },

    Mutation:{
        // create a user
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found');
          }
    
          const correctPassword = await user.isCorrectPassword(password);
    
          if (!correctPassword) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
          saveBook: async (parent, { newBook }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: newBook }},
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId }}},
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
};
module.exports = resolvers;