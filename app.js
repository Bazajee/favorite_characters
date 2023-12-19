

// Importing the Express library
import express from 'express'

// List of possibilities with values and corresponding GIF URLs
const possibilities = [
    {value : "Dwight", gif_url : "dwight_crown.gif"},
    {value : "Jim", gif_url : "jim_hands.gif"},
    {value : "Kevin", gif_url : "kevin.gif"},
    {value : "Michael", gif_url : "michael.gif"},
    {value : "Gandalf", gif_url : "gandalf.gif"},
    {value : "Gary", gif_url : "gary.gif"},
    {value : "Avocato", gif_url : "avocato.gif"},
    {value : "Hughie", gif_url : "hughie.gif"},
    {value : "Aragorn", gif_url : "aragorn.gif"},
    {value : "Boromir", gif_url : "boromir.gif"},
    {value : "Barney", gif_url : "barney.gif"},
    {value : "Lily", gif_url : "lily.gif"},
    {value : "Sarah", gif_url : "sarah.gif"},
    {value : "Nyles", gif_url : "nyles.webp"},
    {value : "Cliff", gif_url : "cliff.webp"},
    
]

// Function to get a random element from a list
function get_random(list) {
    return list[Math.floor(Math.random() * possibilities.length)]
}

// Creating an Express application
const app = express()

// Endpoint to retrieve a random possibility as JSON
app.get('/api', function (request, response) {
    response.send(get_random(possibilities))
})

// Serving static GIF files from the specified directory
app.use('/static/gif', express.static('static/gif/'))

// Endpoint to serve the HTML page
app.get('/', function (request, response) {
    // Getting a random possibility
    const random = get_random(possibilities)
    // Sending an HTML page with a background image and a centered text
    response.send(` <html>
                        <head>
                            <style>
                            /* Styling for the HTML page */
                            body {
                                margin : 0;
                            }
                            h1 {
                                position : absolute;
                                top: 30%;
                                left: 40%;
                                font-size: 6em;
                                color: white;
                                text-align: center;
                                z-index: 1; /* Ensures text is in front of the image */
                            }
                            .image {
                                /* Styling for the background image */
                                width: 100%; /* Image takes full width of the page */
                                height: 100%;
                                background-image: url("/static/gif/${random.gif_url}");
                                background-size : cover;
                                background-position : center;
                            }
                            </style>
                        </head>
                        <body>
                            <!-- Displaying the random value and the image -->
                            <h1>${random.value}</h1>
                            <div class="image"> </div>
                        </body>
                    </html>`)
})

// Listening to server requests on port 3000
app.listen(3000, function () {
    console.log("Server listening on port 3000")
})