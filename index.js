const express = require('express');
var cors = require('cors');
const multer = require("multer");
const path = require("path");


const authRoutes = require("./src/routes/auth.js");
const orgRoutes = require("./src/routes/organization.js");
const outletProductRoutes = require("./src/routes/outletProduct.js");
const orderRoutes = require("./src/routes/order.js");
const historyRoutes = require("./src/routes/history.js");
const promoRoutes = require("./src/routes/promo.js");
const pushNotifRoutes = require("./src/routes/pushNotif.js");
const tagihanRoutes = require("./src/routes/tagihan.js");
const checkOutRoutes = require("./src/routes/checkout.js");



const app = express();




app.use(express.json());
app.use(cors()); // Use this after the variable declaration
const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '_' + file.originalname);
    }
    
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else {
        cb(null, false);
    }
}


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('photo'));
app.use('/api/auth', authRoutes);
app.use('/api/organization', orgRoutes);
app.use('/api/product-outlet', outletProductRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/blogs', promoRoutes);
app.use('/api/notif', pushNotifRoutes);
app.use('/api/tagihan', tagihanRoutes);
app.use('/api/checkout', checkOutRoutes);


app.get('/', (req, res, next) => {
    return res.json({
        developer : 'm zidane firdaus'
    })
})


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})

app.listen(4098, () => {
    console.log('server jalan di port 4098');
})



