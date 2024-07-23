const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000
const URI = 'mongodb://0.0.0.0:27017/BudgetApp'

mongoose.connect(URI).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.json())
app.use('/api/budgets', require('./routers/budgets'))
app.use('/api/auth', require('./routers/auth'))
app.use('/api/expenses', require('./routers/expense'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})