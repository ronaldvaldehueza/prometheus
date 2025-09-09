import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import exphbs from 'express-handlebars';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config/connection.server';
import sequelize from './db/init.sequelize';
import testRoute from './routes/test';
import uiRoutes from './routes/routes';

const app = express();

// 1. View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'mainLayout',
  layoutsDir: path.join(__dirname, 'views', 'layout')
}));
app.set('view engine', 'hbs');

// 2. CORS & body parsing — *before* any routes
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'http://proma.worldcloud9.com',
        'https://proma.worldcloud9.com',
        'http://nodejs.worldcloud9.com',
        'https://nodejs.worldcloud9.com'
      ]
    : [
        'http://localhost:3000', // dev
        'http://127.0.0.1:3000'
      ];

const corsOptionsDelegate = function (req: Request, callback: (err: Error | null, options?: cors.CorsOptions) => void) {
  let corsOptions: cors.CorsOptions;
  if (allowedOrigins.indexOf(req.header('Origin') || '') !== -1) {
    corsOptions = {
      origin: true,
      credentials: true
    };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
}

app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate)); // Handle preflight

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3. Mount API endpoints
app.use('/api/test', testRoute);

// 4. Serve static assets for React app or any other frontend
app.use(express.static(path.join(__dirname, 'views', 'assets')));

// 5. Mount server-side rendered routes (Handlebars) last
app.use('/', uiRoutes);

// 6. Sync DB & then start listening
sequelize
  .sync({ force: false })
  .then(() => {
    const port = process.env.PORT || config.port;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync DB:', err);
    process.exit(1);
  });
