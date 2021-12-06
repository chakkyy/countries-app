const { Router } = require("express");
const { Country, Activity } = require("../db.js");
const router = Router();

router.get("/", async (_req, res, next) => {
  Activity.findAll({
    include: [Country],
  })
    .then((response) => res.json({ response }))
    .catch((error) => next(error));
});

router.post("/", async (req, res) => {
  const { countries, name, difficulty, duration, season } = req.body;

  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  countries.map(
    async (c) => await newActivity.setCountries(await Country.findByPk(c))
  );

  res.json(newActivity);
});

module.exports = router;
