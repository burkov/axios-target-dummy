import express from 'express';
import { RouteParams } from './dto';
import joi from '@hapi/joi';

const router = express.Router();

router.post<RouteParams>('/:status(\\d{3})/:shape(valid|malformed)', (req, res) => {
  const { status, shape } = joi.attempt(
    req.params,
    joi.object().keys({
      status: joi.number().min(100).max(999),
      shape: joi.string().valid('malformed', 'valid'),
    }),
  );
  const isSucess = status >= 200 && status <= 400;
  res.status(status);
  if (shape === 'malformed') {
    res.send('malformed body');
    return;
  }

  const response = isSucess
    ? { result: 'some result' }
    : { errors: [{ type: 'Type', title: 'Error title', detail: 'Error detail' }] };

  res.send(response);
});

export default router;
