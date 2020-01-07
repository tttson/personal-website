const router = require('express').Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./inhome.db')

router.get('/', (req, res, next)=> {
  db.all('SELECT order_id, item_id, items.name AS item_name FROM order_items JOIN items ON items.id = order_items.item_id',
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})

router.get('/:orderID', (req,res,next)=>{
  //lists out all the item names in order
  const orderID = req.params.orderID
  db.all('SELECT order_id, item_id, items.name AS item_name FROM order_items JOIN items ON items.id = order_items.item_id WHERE order_id = $orderID', {
    $orderID : orderID
  },
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})

router.post('/', (req,res, next) => {
  const name = req.body.name
  const items = req.body.items

})

router.put('/:orderID')

router.delete('/:orderID', (req,res,next)=> {
  const sql = 'DELETE FROM orders WHERE orders.id = $orderID'
  const values = {$orderID: req.params.orderID}
  db.run(sql, values, (error) => {
    if(error){
      next(error)
    } else {
      res.sendStatus(204)
    }
  })
})


module.exports = router
