const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, 
    useCreateIndex: true, useUnifiedTopology: true, }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
});

const playlistsRouter = require('./routes/playlists');

app.use('/playlists', playlistsRouter);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/build'));
}

app.listen(port, () => {
    console.log(`Server on port: ${port}`);
});