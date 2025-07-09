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

// เพิ่ม routes ใหม่
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// สำหรับรับข้อมูลจากฟอร์ม contact
app.post('/contact', (req, res) => {
  // ในที่นี้แค่แสดงผลลัพธ์ ควรเพิ่มการบันทึกข้อมูลจริงใน production
  console.log('Contact form submitted:', req.body);
  res.redirect('/contact?success=true');
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