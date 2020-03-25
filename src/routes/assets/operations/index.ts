import express from 'express';
import _ from 'lodash';

const router = express.Router();

export enum ManageOperationId {
  SwitchKeysToInvitations = 'SwitchKeysToInvitations',
  ExportLicensesIntoXLSX = 'ExportLicensesIntoXLSX',
  ExportLicensesIntoXLSXNoPersonalData = 'ExportLicensesIntoXLSXNoPersonalData',
  ExportLicensesIntoTXT = 'ExportLicensesIntoTXT',
  ExportLicensesWithHistoryIntoXLSX = 'ExportLicensesWithHistoryIntoXLSX',
  TransferToAnotherCustomer = 'TransferToAnotherCustomer',
  TransferToAnotherTeam = 'TransferToAnotherTeam',
  PayForTheNextPeriod = 'PayForTheNextPeriod',
  ChangeSubscriptionsPack = 'ChangeSubscriptionsPack',
  AssignLicenses = 'AssignLicenses',
  RevokeLicenses = 'RevokeLicenses',
  RemoveLicenses = 'RemoveLicenses',
  RemoveSponsoredLicenses = 'RemoveSponsoredLicenses',
  RequestActivationCodes = 'RequestActivationCodes',
}

router.post('/manage', (req, res) => {
  const result = _.map(Object.keys(ManageOperationId), (id: string) => ({
    operationId: id,
    assetDataIds: [1, 2],
  }));
  res.send({ result });
});

export default router;
