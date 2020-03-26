import * as faker from 'faker';
import express, { Express } from 'express';
import { fakeErrors, fakeScheduledCancellationEntry, fakeSearchEntry } from './fakes';
import _ from 'lodash';
import { CancelLicenses } from './Models';
import randomErrorEmitter from '../../../middleware/randomErrorEmitter';

const router = express.Router();

router.post('/search', (req, res) => {
  const { licenseIds, domain } = req.body;
  if (licenseIds !== undefined) {
    const fakeDomain = faker.internet.domainName();
    res.json({
      result: licenseIds.map((licenseId: string) => ({
        licenseId: licenseId.toUpperCase(),
        email: faker.internet.email(undefined, undefined, fakeDomain),
      })),
    });
  } else {
    res.json({
      result: _.times(_.random(10, 200), () => fakeSearchEntry(domain)),
    });
  }
});

const scheduledCancellations = _.times(_.random(5, 10), fakeScheduledCancellationEntry);

router.get('/scheduled', (req, res) => {
  res.json({ result: scheduledCancellations });
});

router.post('/scheduled', (req, res) => {
  const { purpose }: CancelLicenses.StartRequest = req.body;
  const { id: maxId } = _.maxBy(scheduledCancellations, 'id')!;
  const next = fakeScheduledCancellationEntry(maxId + 1, 'Active', purpose);
  scheduledCancellations.push(next);
  res.json({ result: next });
});

const addRoutes = (app: Express, route: string) => {
  app.use(
    randomErrorEmitter([
      {
        urlRegexp: /cancel-licenses/,
        probability: 100,
        errorsFunc: fakeErrors,
      },
    ]),
  );
  app.use(route, router);
};

export default addRoutes;
