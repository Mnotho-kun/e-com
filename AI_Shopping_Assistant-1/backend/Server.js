const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shopping_assistant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the review schema and model
const reviewSchema = new mongoose.Schema({
  product_name: String,
  rating: Number,
  review_text: String,
  name: String,
  email: String,
});

const Review = mongoose.model('Review', reviewSchema);

// Define the user schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  companyName: String,
  countryRegion: String,
  streetAddress: String,
  streetAddress2: String,
  townCity: String,
  state: String,
  zipCode: String,
  accountNumber: String,
  cvc: String,
  expiryDate: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/E-com.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Shop-Page/Shop.html'));
});

app.get('/purchase-page-1', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page.html'));
});

app.get('/purchase-page-2', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-2.html'));
});

// Add routes for remaining purchase pages
app.get('/purchase-page-3', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-3.html'));
});

app.get('/purchase-page-4', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-4.html'));
});

app.get('/purchase-page-5', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-5.html'));
});

app.get('/purchase-page-6', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-6.html'));
});

app.get('/purchase-page-7', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-7.html'));
});

app.get('/purchase-page-8', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Purchase/Purchase-Page-8.html'));
});

app.get('/contact-us', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/ContactUs/Contact-Us.html'));
});

app.get('/view-cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/View Cart/View-Cart.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/Check Out/Check-Out.html'));
});

// Route for About Us page
app.get('/about-us', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/E-com/AboutUs/About-Us.html'));
});

// Route to submit a review
app.post('/submit-review', async (req, res) => {
  const { product_name, rating, review_text, name, email } = req.body;

  console.log('Received review data:', { product_name, rating, review_text, name, email });

  if (!product_name || !rating || !review_text || !name || !email) {
    console.log('Missing fields:', { product_name, rating, review_text, name, email });
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const review = new Review({ product_name, rating, review_text, name, email });
    await review.save();
    console.log('Review successfully saved:', review);
    res.json({ success: true, message: 'Review submitted successfully.' });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ success: false, message: 'Error saving review.' });
  }
});

// Route to save user details
app.post('/api/saveUser', async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    companyName,
    countryRegion,
    streetAddress,
    streetAddress2,
    townCity,
    state,
    zipCode,
    accountNumber,
    cvc,
    expiryDate
  } = req.body;

  console.log('Received user data:', { firstName, lastName, phone, email, companyName, countryRegion, streetAddress, streetAddress2, townCity, state, zipCode, accountNumber, cvc, expiryDate });

  if (!firstName || !lastName || !phone || !email || !countryRegion || !streetAddress || !townCity || !state || !zipCode || !accountNumber || !cvc || !expiryDate) {
    console.log('Missing fields:', { firstName, lastName, phone, email, companyName, countryRegion, streetAddress, streetAddress2, townCity, state, zipCode, accountNumber, cvc, expiryDate });
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      companyName,
      countryRegion,
      streetAddress,
      streetAddress2,
      townCity,
      state,
      zipCode,
      accountNumber,
      cvc,
      expiryDate
    });
    await user.save();
    console.log('User details successfully saved:', user);
    res.json({ success: true, message: 'User details saved successfully.' });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ success: false, message: 'Error saving user details.' });
  }
});

// Route to get user details by email
app.get('/api/getUser/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ success: false, message: 'Error retrieving user details.' });
  }
});


// Configure PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Route to handle successful PayPal transactions
app.post('/api/paypal-transaction-complete', async (req, res) => {
  const { orderID } = req.body;

  // Create a request to get the order details from PayPal
  const request = new paypal.orders.OrdersGetRequest(orderID);

  try {
    // Execute the request to get the order details
    const order = await client.execute(request);

    // Log order details (for debugging purposes)
    console.log('PayPal transaction completed:', order.result);

    // Here, you can add code to validate the order details,
    // check the order status, save details to the database, etc.
    if (order.result.status === 'COMPLETED') {
      // Add your custom logic for a completed transaction here, e.g., saving to a database
      res.json({ success: true, message: 'Transaction recorded successfully.' });
    } else {
      // Handle any other order statuses
      res.status(400).json({ success: false, message: 'Transaction not completed.' });
    }
  } catch (error) {
    console.error('Error validating PayPal order:', error);
    res.status(500).json({ success: false, message: 'Error processing transaction.' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
