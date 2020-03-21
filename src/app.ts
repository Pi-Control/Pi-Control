import express, { Request, Response, NextFunction } from 'express';
import graphqlHTTP from 'express-graphql';
import { json } from 'body-parser';
import { graphql } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { cpuTemperature, Systeminformation } from 'systeminformation';

import dbTestRoute from './routes/dbTest';
import CpuMetrics from './models/CpuMetrics';

import MetricsCollector from './lib/metrics/MetricsCollector';
import Scheduler from './lib/scheduler/Scheduler';

import { schema, resolvers } from './graphql';

const metrics = new MetricsCollector<Systeminformation.CpuTemperatureData>(
  cpuTemperature,
  '5s',
  data => ({ value: data.main, unit: 'Degress' }),
  CpuMetrics
);

metrics.start();

const app = express();

app.use(json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.use('/db', dbTestRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something bad happend :(', err);
  next();
});

graphql(schema, '{ hello }', resolvers).then(response => {
  console.log(response);
});

Scheduler.call(() => {
  console.log('scheduler', new Date());
}).in('1m');

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
