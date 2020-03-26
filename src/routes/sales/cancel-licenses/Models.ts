export declare namespace CancelLicenses {
  type SearchResult = SearchEntry[];
  type StartResult = ScheduledCancellation;
  type ListResult = ScheduledCancellation[];

  type SearchByDomainRequest = { domain: string };
  type SearchByLicenseIdsRequest = { licenseIds: string[] };

  type SearchRequest = SearchByDomainRequest | SearchByLicenseIdsRequest;
  type StartRequest = SearchByLicenseIdsRequest & { purpose: string };

  type SearchEntry = {
    licenseId: string;
    email: string;
  };

  type Status = 'Active' | 'Error' | 'Finished';

  type ScheduledCancellation = {
    id: number;
    purpose: string;
    salesRep: string;
    total: number;
    cancelled: number;
    status: Status;
  };
}
