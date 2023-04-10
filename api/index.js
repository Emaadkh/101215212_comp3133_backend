const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("../schema");
const resolvers = require("../resolvers");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://Emaadkh:Emad2572@cluster0.f2ujd7x.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log(err)
});

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

module.exports = httpServer;
