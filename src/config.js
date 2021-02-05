module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://mlyuurfwtyedfh:92ff09043eabd0824d9d8bb99946669f1cc83ad094704972dc51765c2700a9a3@ec2-52-44-139-108.compute-1.amazonaws.com:5432/de8fhncugherm3&ssl=on',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/noteful-test',
  API_TOKEN: process.env.API_TOKEN || 'myToken'     
};