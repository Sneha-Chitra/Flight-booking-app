import mongoose from 'mongoose';

// Replace this with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://Bharath:Bharath0510@cluster0.dgwew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Define flight schema
const flightSchema = new mongoose.Schema({
  flightName: { type: String, required: true },
  flightId: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  basePrice: { type: Number, required: true },
  totalSeats: { type: Number, required: true }
});

const Flight = mongoose.model('Flight', flightSchema);

// Cities available for origin and destination
const cities = [
  "Chennai", "Bangalore", "Hyderabad", "Mumbai", "Indore", "Delhi",
  "Pune", "Trivendrum", "Bhopal", "Kolkata", "Varanasi", "Jaipur"
];

// Function to generate random flight data
function generateRandomFlightData() {
  const origin = cities[Math.floor(Math.random() * cities.length)];
  let destination;
  do {
    destination = cities[Math.floor(Math.random() * cities.length)];
  } while (destination === origin);  // Ensure destination is different from origin

  const flightId = `AI${Math.floor(100 + Math.random() * 900)}`;
  const flightName = `Air India ${flightId}`;
  const departureTime = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  const arrivalTime = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  const basePrice = Math.floor(3000 + Math.random() * 3000);
  const totalSeats = Math.floor(100 + Math.random() * 100);

  return {
    flightName,
    flightId,
    origin,
    destination,
    departureTime,
    arrivalTime,
    basePrice,
    totalSeats
  };
}

// Main function to insert multiple flights
async function insertFlights() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const flights = Array.from({ length: Math.floor(40 + Math.random() * 30) }, generateRandomFlightData);

  try {
    const result = await Flight.insertMany(flights);
    console.log(`${result.length} flights have been added to the database.`);
  } catch (error) {
    console.error('Error inserting flights:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the insert function
insertFlights().catch(err => console.error('Error:', err));
