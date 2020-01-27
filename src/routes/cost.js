import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  // duplicated below, to refactor
  const costs = await req.context.models.Cost.findAll();
  return res.send(costs);
});

router.get('/:costId', async (req, res) => {
  const cost = await req.context.models.Cost.findByPk(
    req.params.costId,
  );
  return res.send(cost);
});

router.post('/', async (req, res) => {
  const cost = await req.context.models.Cost.create({
    userId: req.context.me.id,
    description: req.body.description,
    type: req.body.type,
    amount: req.body.amount,
    source: req.body.source,
  });

  return res.send(cost);
});

router.delete('/:costId', async (req, res) => {
  const result = await req.context.models.Cost.destroy({
    where: { id: req.params.costId },
  });

  return res.send(true);
});

router.put('/:costId', async (req, res) => {
  const cost = await req.context.models.Cost.findByPk(req.params.costId);
  if((cost.userId) === req.context.me.id) {
    try {
      const result = await req.context.models.Cost.update({
        // text: req.body.text,
        // userId: req.me.id,
        where: { id: req.params.costId },
      });
      return res.send(true);
    } catch (err) {
        return res.send("Sorry, an error occurred");
    }
  }
  else {
    return res.send("Sorry, you are not the creator of the cost");
  }
});

export default router;

