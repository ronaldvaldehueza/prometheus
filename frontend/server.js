const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Add Sequelize setup
const sequelize = require('./db/init.sequelize.js'); // adjust path if needed

// Sync DB and log result
sequelize.sync({ force: false })
  .then(() => {
    console.log('SQLite DB synced successfully.');
  })
  .catch((err) => {
    console.error('DB sync failed:', err);
  });

// Serve static files from the React app *only in production*
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Backend is running. Frontend is served by React Dev Server.');
  });
}

app.listen(port, () => console.log(`Listening on Port ${port}`));
