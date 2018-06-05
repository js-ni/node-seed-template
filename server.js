import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Models from './src/db/models';
import Routes from './src/endpoint';
import path from 'path';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Routes);

const env = process.env.NODE_ENV || 'development';

app.use(express.static(__dirname));
app.get('/docs/node-seed-template/1.0.0', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/docs/index.html')); 
});

Models.sequelize.sync()
    .then(() => {
        startApp(7777);
    })
    .catch((e) => {
        throw new Error(e);
    });

function startApp(port) {
    app.listen(port, function(){
        console.log('|o| yupiii!! your api seed is now listening on port', port);
    });
}
