import express from 'express';
import { RouteParams } from './dto';
import Joi from '@hapi/joi';

const router = express.Router();

router.post<RouteParams>('/:status(\\d{3})/:shape(valid|malformed)', (req, res) => {
  const { status, shape } = Joi.attempt(
    req.params,
    Joi.object().keys({
      status: Joi.number().min(100).max(999),
      shape: Joi.string().valid('malformed', 'valid'),
    }),
  );
  const isSucess = status >= 200 && status < 400;
  res.status(status);
  if (shape === 'malformed') {
    res.send({ glitched: '42' });
    return;
  }

  const response = isSucess
    ? { result: 'some result' }
    : { errors: [{ type: 'Type', title: 'Error title', detail: 'Error detail' }] };

  res.send(response);
});

export default router;
