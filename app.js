import express from 'express'


const possibilities = [
    {value : "Dwight", gif_url : "dwight_crown.gif"},
    {value : "Jim", gif_url : "jim_hands.gif"},
    {value : "Kevin", gif_url : "kevin_spit.gif"}
]
function get_random (list){
    return list[Math.floor(Math.random() * possibilities.length)]
}
const app = express()


app.get('/api', function (request, response) {
    response.send(get_random(possibilities))
})

app.use('/static/gif', express.static('static/gif/'))



app.get('/', function (request, response) {
    const random = get_random(possibilities)
    response.send(` <html>
                        <head>
                            <style>
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
                                z-index: 1; /* Pour s'assurer que le texte est devant l'image */
                            }
                            .image {

                                width: 100%; /* L'image prend toute la largeur de la page */
                                height: 100%;
                                background-image: url("/static/gif/${random.gif_url}");
                                background-size : cover;
                                background-position : center;
                            }
                            </style>
                    </head>
                    <body>
                        <h1>${random.value}</h1>
                        <div class="image"> </div>
                    
                    </body>
                </html>`)
  })

app.listen(3000, function () {
  console.log("Server listening on port 3000")
})

