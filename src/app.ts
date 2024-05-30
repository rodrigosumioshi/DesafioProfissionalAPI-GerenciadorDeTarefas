import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { routes } from './routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  public middleware() {
    this.express.use(cors({
      origin: 'http://127.0.0.1:5500',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }));
    this.express.use(express.json());
    this.express.use(express.static(path.join(__dirname, '../todo')));
  }

  public async database() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/natan-ToDo');
      console.log("Sucesso ao conectar com o banco de dados");
    } catch (error) {
      console.error("Não foi possível conectar na base de dados:", error);
    }
  }

  public routes() {
    this.express.use(routes);
  }
}

export default new App().express;
