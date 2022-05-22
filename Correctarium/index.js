import express from 'express';
import router from './router.js';

const PORT = 3000;
const app = express();

app.listen(3000,()=>{
  console.log(`Server has been started on port ${PORT}`);
})

app.use(express.json());
app.use('/api', router);

