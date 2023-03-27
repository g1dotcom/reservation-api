const {
  typeByCity,
  typeByCount,
  getAllHotel,
  getSingleHotel,
  deleteHotel,
  updateHotel,
  createHotel,
} = require("../controllers/hotel.js");

const router = express.Router();

router.get("/typeByCity", typeByCity);
router.get("/typeByCount", typeByCount);
router.post("/createHotel", createHotel);
router.put("/updateHotel/:id", updateHotel);
router.delete("/deleteHotel/:id", deleteHotel);
router.get("/getSingleHotel/:id", getSingleHotel);
router.get("/getAllHotel", getAllHotel);

module.exports = router;
