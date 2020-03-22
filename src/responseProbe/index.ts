import express from "express";
import { RouteParams } from "./dto";

const router = express.Router();

router.post<RouteParams>("/:status(\\d{3})/:shape(valid|malformed)", (req, res) => {
  const { status, shape } = req.params;
  const parsed = parseInt(status);
  res.status(parsed);
  const isValid = shape === "valid";

  res.send(req.params);
}
);

export default router;
