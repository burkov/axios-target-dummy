import faker from 'faker';
import _ from 'lodash';
import { CancelLicenses } from './Models';
import { JPFError } from '../../Models';

export const fakeLicenseId = () => faker.random.alphaNumeric(10).toUpperCase();
export const fakeStatus = (): CancelLicenses.Status =>
  faker.random.arrayElement(['Active', 'Error', 'Finished']);
export const salesReps = _.range(0, 5).map(
  () => `${faker.name.firstName()} ${faker.name.lastName()}`,
);
export const fakeSalesRep = () => faker.random.arrayElement(salesReps);

export const fakeSearchEntry = (
  domain = faker.internet.domainName(),
): CancelLicenses.SearchEntry => {
  return {
    licenseId: fakeLicenseId(),
    email: faker.internet.email(undefined, undefined, domain),
  };
};

export const fakeScheduledCancellationEntry = (
  id: number,
  forceStatus?: CancelLicenses.Status,
  forcePurpose?: string,
): CancelLicenses.ScheduledCancellation => {
  const total = _.random(10, 1000);
  const status: CancelLicenses.Status = forceStatus || fakeStatus();
  const cancelled = status === 'Finished' ? total : _.random(total - 1);
  return {
    id,
    status,
    purpose: forcePurpose || `Issue id: JPF-${_.random(1111, 9999)}`,
    salesRep: fakeSalesRep(),
    total,
    cancelled,
  };
};

export const fakeErrors = (): JPFError[] => {
  return [
    {
      type: 'FakeError',
      title: 'License not found',
      detail:
        "That's all. No details info provided. But it can be rather long. I hope you UI is overflow-proof.",
      licenseIds: _.times(_.random(1, 5), fakeLicenseId),
    },
    {
      type: 'FakeError',
      title: 'Not a student license',
      detail:
        "That's all. No details info provided. But it can be rather long. I hope you UI is overflow-proof.",
      licenseIds: _.times(_.random(1, 5), fakeLicenseId),
    },
    {
      type: 'FakeError',
      title: 'Already has been cancelled',
      detail:
        "That's all. No details info provided. But it can be rather long. I hope you UI is overflow-proof.",
      licenseIds: _.times(_.random(1, 5), fakeLicenseId),
    },
  ];
};
