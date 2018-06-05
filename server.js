import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Models from './src/db/models';
import Middleware from './src/common/security/http.middleware';
import Routes from './src/endpoint';
import path from 'path';
import { general } from './src/common/config/auth.config';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Middleware);
app.use(Routes);

const env = process.env.NODE_ENV || 'development';

app.use(express.static(__dirname));
app.get('/docs/flowdu-api/1.0.0', (req, res, next) => {
    if(env === general.env.dev) {        
        res.sendFile(path.join(__dirname + '/docs/index.html'));        
    }
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
        console.log('|o| yupiii!! flowdu api is now listening on port', port);
    });
}
