const { Router } = require("express");
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();

router.get("/", async (req, res) => {
  const all = await Country.findAll({ include: Activity });
  if (req.query.name) {
    let { name } = req.query;
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const found = await Country.findAll({
      where: { name: { [Op.substring]: name } },
    });
    return res.json(found);
  }

  res.json(all);
});

router.get("/:id", async (req, res) => {
  const one = await Country.findByPk(req.params.id.toUpperCase(), {
    include: Activity,
  });
  if (!one) {
    return res.status(404).send("Error: country not found");
  }
  return res.json(one);
});

module.exports = router;
