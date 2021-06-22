const router = require('express').Router();
const { Cocktail, Tag } = require('../db/models')
const db = require('../db/db')
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const cocktails = await db.query(
      `select cocktails.id, cocktails.name from cocktails`,
      {
        plain: false,
        raw: false,
        type: QueryTypes.SELECT,
      }
    );
    res.json(cocktails);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { likes, dislikes } = req.body;
    if (likes.any(id => isNaN(id)) || dislikes.any(id => isNaN(id))) res.sendStatus(201)
    const likesWhere = likes.length
      ? `cocktails.id in (
	    select cocktail_tags."cocktailId" from cocktail_tags
	    where cocktail_tags."tagId" in (${likes})
      group by cocktail_tags."cocktailId"
      having count(*) = ${likes.length})`
      : '';
    const dislikesWhere = dislikes.length
      ? `cocktails.id not in (
	    select cocktail_tags."cocktailId" from cocktail_tags
	    where cocktail_tags."tagId" in (${dislikes}))`
      : '';
    const where =
      likes.length || dislikes.length
        ? ` where ${likesWhere}
      ${likes.length && dislikes.length ? ' and ' : ''}
      ${dislikesWhere}`
        : '';
    const query = `select cocktails.id, cocktails.name from cocktails${where}`;
    const cocktails = await db.query(query, {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    });
    res.json(cocktails);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const tag = await Cocktail.findByPk(id, { include: Tag });
    res.json(tag);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
