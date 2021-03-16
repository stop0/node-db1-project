const router = require('express').Router()
const Account = require("./accounts-model")

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const grab = await Account.getAll();
    res.status(200).json(grab);
  } catch (e) {
    next(e);
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(next())
})

router.post('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await Account.create(req.body)
    const addedAccount =  await Account.getById(req.accounts.length)
    res.status(200).json(addedAccount)
  }
  catch (err) {
    next()
  }
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.updateById(req.params.id, req.body)
    const updatedAccount = await Account.getById(req.params.id)
    res.status(202).json(updatedAccount)
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id',async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await  Account.getById(req.params.id)
    await Account.deleteById(req.params.id)
    res.json(`The account with the following information has been deleted ${deletedAccount}`)
  }
  catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
