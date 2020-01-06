const router = require('express').Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./inhome.db')

router.get('/', (req, res, next)=> {
  db.all('SELECT * FROM items',
  (error, users) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({users})
    }
  })
})

module.exports = router
