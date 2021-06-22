const router = require('express').Router();
const { Cocktail, Tag } = require('../db/models')
const db = require('../db/db')
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const tags = await db.query(
      `
      select tags.id, tags.tag, tags.type, count(*) as count
      from tags
      join cocktail_tags on cocktail_tags."tagId" = tags.id
      group by tags.id, tags.tag
      order by tags.tag`,
      {
        plain: false,
        raw: false,
        type: QueryTypes.SELECT,
      }
    );
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let cocktailIds = req.body.cocktailIds || [];
    if (cocktailIds.any(id => isNaN(id))) res.sendStatus(201)
    if (cocktailIds.length === 0) {
      cocktailIds = (await Cocktail.findAll()).map((cocktail) => cocktail.id);
    }
    const count = cocktailIds.length;
    let queriedIds = req.body.queriedIds || [];
    queriedIds.push(0);
    const tags = await db.query(
      `select tags.id, tags.tag, tags.type, abs(${count / 2}-count(*)) as score
        from tags
        join cocktail_tags on cocktail_tags."tagId" = tags.id
        where cocktail_tags."cocktailId" in (${cocktailIds})
        and tags.id not in (${queriedIds})
        group by tags.id, tags.tag
        order by score`,
      {
        plain: false,
        raw: false,
        type: QueryTypes.SELECT,
      }
    );
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const tag = await Tag.findByPk(id, { include: Cocktail });
    res.json(tag);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
