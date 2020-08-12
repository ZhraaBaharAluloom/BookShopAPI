const express = require("express");

const router = express.Router();

const multer = require("multer");

const {
  createVendor,
  createBook,
  listVendor,
  updateVendor,
  deleteVendor,
  fetchVendor,
} = require("../controllers/venderController");
const passport = require("passport");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);
  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const err = new Error("Vendor is not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", listVendor);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createVendor
);

router.post("/:vendorId/books", upload.single("image"), createBook);

router.put("/:vendorId", upload.single("image"), updateVendor);

router.delete("/:vendorId", deleteVendor);

module.exports = router;
