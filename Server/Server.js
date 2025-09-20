require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const app = express();

const emotionRouter = require('./Router/emotion-router.js');
const ollamaRouter = require('./Router/Ollama.js');

const corsOptions = {
  origin: [
    'http://localhost:5173', // Your local frontend
    'https://theautisticapi.vercel.app',
    'https://puapi.vercel.app' // Your deployed frontend URL
  ],
  methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
  credentials: true,
};


//middleware
app.use(cors(corsOptions));


app.use(express.json());

// app.use("/api/auth", authRouter); // authRouter not present in this project root - comment out to avoid crash
app.use('/api/emotion', emotionRouter);
app.use('/api/ollama', ollamaRouter);





// app.get("/", (req, res) => {
//     res.status(200).send("Hello World!");   
// });

// app.get("/register", (req, res) => {
//     res.status(200).send("Register Page");      
// });

app.get("/", (req, res) => {
    // console.log("hi backend running");
    res.status(200).send("hi backend running");
});

const PORT = process.env.PORT || 5000;

// Start server directly since no database connection is needed for ASR/emotion processing
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('ASR, Emotion, and Ollama routes mounted successfully');
    console.log('Ollama endpoint: /api/ollama/chat');
});
