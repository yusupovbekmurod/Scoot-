export default function UserCheck(req, res, next) {
  let { author, name, price, janr, page, year } = req.body;
  if (author && name && price && janr && page && year) {
    name.length > 4 && name.length < 20;
    return next();
  } else {
    res.status(404).json({ status: 404, message: "bad request" });
  }
}
