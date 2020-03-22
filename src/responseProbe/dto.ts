import { ParamsDictionary } from 'express-serve-static-core';

export type Shape = 'valid' | 'malformed';

export interface RouteParams extends ParamsDictionary {
  status: string;
  shape: Shape;
}
