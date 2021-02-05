const knex = require('knex');
const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');


const db  = knex({
  client: 'pg',
  connection: 'postgres://bdjmzgvboxgjjh:627012a38071ea07738478fd4379197f1abbd46c3c57c7cfa91edd0af72004d9@ec2-23-20-20-150.compute-1.amazonaws.com:5432/d13pi6987ob7uq?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory',  
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

