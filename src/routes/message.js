import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
      [req.params.messageId]: message,
      ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

router.put('/:messageId', (req, res) => {
  const message = {
    id: req.params.messageId,
    text: req.body.text,
    userId: req.me.id,
  };

  if((messages[message.id].userId) === message.userId) {

    messages[message.id] = message.text;

    return res.send(message);
  } else {
    return res.send("Sorry, you are not the creator of the message");
  }
});

export default router;
