import * as faker from 'faker';
import express from 'express';
import { fakeErrors, fakeScheduledCancellationEntry, fakeSearchEntry } from './fakes';
import _ from 'lodash';
import { CancelLicenses } from './Models';
import app from '../../../index';
import randomErrorEmitter from '../../../middleware/randomErrorEmitter';

const router = express.Router();

router.post('/sales/api/cancel-licenses/search', (req, res) => {
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

router.get('/sales/api/cancel-licenses/scheduled', (req, res) => {
  res.json({ result: scheduledCancellations });
});

router.post('/sales/api/cancel-licenses/scheduled', (req, res) => {
  const { purpose }: CancelLicenses.StartRequest = req.body;
  const { id: maxId } = _.maxBy(scheduledCancellations, 'id')!;
  const next = fakeScheduledCancellationEntry(maxId + 1, 'Active', purpose);
  scheduledCancellations.push(next);
  res.json({ result: next });
});

app.use(
  randomErrorEmitter([
    {
      urlRegexp: /cancel-licenses/,
      probability: 100,
      errorsFunc: fakeErrors,
    },
  ]),
);
