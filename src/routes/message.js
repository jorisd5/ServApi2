import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  // duplicated below, to refactor
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  return res.send(message);
});

router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

router.put('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(req.params.messageId);
  if((message.userId) === req.context.me.id) {
    try {
      const result = await req.context.models.Message.update({
        // text: req.body.text,
        // userId: req.me.id,
        where: { id: req.params.messageId },
      });
      return res.send(true);
    } catch (err) {
        return res.send("Sorry, an error occurred");
    }
  }
  else {
    return res.send("Sorry, you are not the creator of the message");
  }
});

export default router;
