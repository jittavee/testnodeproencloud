require('dotenv').config();
const express = require('express');
const app = express();

// ตั้งค่า EJS เป็น template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// ตั้งค่า static files
app.use(express.static('public'));

// Route หลัก
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to Proen.cloud',
    serverInfo: {
      name: 'Proen Cloud Server',
      status: 'Active',
      time: new Date().toLocaleTimeString()
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});




// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});