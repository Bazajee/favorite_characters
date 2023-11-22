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
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            margin: 0;
                        }
                        h1 {
                            font-size: 6em;
                            color: white;
                            text-align: center;
                            z-index: 1; /* Pour s'assurer que le texte est devant l'image /
                        }
                        img {
                            width: 100%; / L'image prend toute la largeur de la page /
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 0; / Pour s'assurer que l'image est derrière le texte */
                        }
                        </style>
                </head>
                <body>
                    <h1>${random.value}</h1>
                    <img src='/static/gif/${random.gif_url}' />
                </body>
                </html>`)
  })

app.listen(3000, function () {
  console.log("Server listening on port 3000")
})

