import { Request, RequestHandler } from 'express';
import _ from 'lodash';
import { JPFError, JPFResponse } from '../routes/Models';
import Joi from '@hapi/joi';

type ErrorRate = {
  urlRegexp: RegExp;
  probability: number;
  errorsFunc: (req: Request) => JPFError[];
  status?: number;
};

type ErrorRates = ErrorRate[];

const validateRates = (rates: ErrorRates) => {
  const schema = Joi.array().items(
    Joi.object().keys({
      //@ts-ignore type definition is outdated, .regex() exists in 17.1.1
      urlRegexp: Joi.object().regex(),
      probability: Joi.number().min(0).max(100),
      producer: Joi.function().arity(1),
      status: Joi.number().min(100).max(999).optional(),
    }),
  );
  Joi.assert(rates, schema);
};

const randomErrorEmitter = (rates: ErrorRates): RequestHandler => {
  validateRates(rates);
  return (req, res, next) => {
    const firstMatched = _.find(rates, ({ urlRegexp }: ErrorRate) => urlRegexp.test(req.url));
    if (firstMatched) {
      const { probability, errorsFunc, status = 400 } = firstMatched;
      const shouldEmitError = _.random(0, 100 - probability) === 0;
      if (shouldEmitError) {
        const fakeErrorResponse: JPFResponse = {
          errors: errorsFunc(req),
        };
        res.json(fakeErrorResponse);
        res.status(status);
      }
    } else next();
  };
};

export default randomErrorEmitter;
