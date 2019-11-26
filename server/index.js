const { GraphQLServer } = require('graphql-yoga');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const db = require('./db');
const serverConfig = require('./server');

db(process.env.DATABASE);

const server = new GraphQLServer(serverConfig);

server.express.use(cookieParser());

// decode JWT to get userId on every request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    // use App Secret to make sure no one faked a token
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto the request
    req.userId = userId;
  }
  next();
});

const options = {
  port: 4444,
  cors: {
    credentials: true,
    origin: 'http://localhost:7777',
  },
};

server.start(options, () =>
  console.log('🗽 🗽  Server is running on port 4444')
);
