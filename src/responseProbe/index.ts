import express from 'express';
import { RouteParams } from './dto';

const router = express.Router();

router.post<RouteParams>('/:status(\\d{3})/:shape(valid|malformed)', (req, res) => {
  const { status, shape } = req.params;
  const parsedStatus = parseInt(status, 10);
  const isSucess = parsedStatus >= 200 && parsedStatus <= 400;
  res.status(parsedStatus);
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
