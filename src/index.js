import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

import models, { sequelize } from './models';

import routes from './routes';

const app = express();

// Domains to whitelist in production(!!!), see Node.js CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('jd'),
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/costs', routes.cost);

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithCosts();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithCosts = async () => {
  await models.User.create(
    {
      username: 'jd',
      costs: [
        {
          description: 'Bruin brood',
          type: 'Private',
          amount: 2.10,
          source: 'Bakker',
        },
        {
          description: 'Bruin brood',
          type: 'Private',
          amount: 2.10,
          source: 'Bakker',
        },
        {
          username: 'jd',
          description: 'Kruidenier',
          type: 'Private',
          amount: 20,
          source: 'Delhaize',
        },
        {
          username: 'jd',
          description: 'Kruidenier',
          type: 'Private',
          amount: 20,
          source: 'Delhaize',
        },
        {
          username: 'jd',
          description: 'Film',
          type: 'Private',
          amount: 11,
          source: 'UGC',
        },
        {
          username: 'jd',
          description: 'Film',
          type: 'Private',
          amount: 11,
          source: 'UGC',
        },
        {
          username: 'jd',
          description: 'Film',
          type: 'Private',
          amount: 11,
          source: 'UGC',
        }
    ],
  },
  {
    include: [models.Cost],
  },
  );

  // await models.User.create(
  //   {
  //     username: 'dludo',
  //     messages: [
  //       {
  //         text: 'Having a byrole in this production',
  //       },
  //       {
  //         text: 'And meeting some nice people',
  //       },
  //     ],
  //   },
  //   {
  //     include: [models.Message],
  //   }
  // );

};
