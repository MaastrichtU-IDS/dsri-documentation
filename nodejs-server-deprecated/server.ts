import express from 'express';
import { initialize } from 'express-openapi';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from "path";
import mysql from "mysql";
import expressOasGenerator from "express-oas-generator";
// import * as swaggerUi from 'swagger-ui-express';


// Instantiate the Express server:
export const app = express();
// expressOasGenerator.handleResponses(app, {});
expressOasGenerator.init(app, {});

// expressOasGenerator.init(app, function(spec) {
//   _.set(spec, 'info.title', 'New Title');
//   _.set(spec, 'paths[\'/path\'].get.parameters[0].example', 2);
//   return spec;
// }); 


// const apiDoc = {
//   openapi: '3.0',
//   // basePath: '/',
//   info: {
//     title: 'An API to manage DSRI users and GPU schedule.',
//     version: '1.0.0'
//   },
//   // definitions: {
//   //   // World: {
//   //   //   type: 'object',
//   //   //   properties: {
//   //   //     name: {
//   //   //       description: 'The name of this world.',
//   //   //       type: 'string'
//   //   //     }
//   //   //   },
//   //   //   required: ['name']
//   //   // }
//   // },
//   paths: {}
// };

// initialize({
//   app,
//   // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
//   // apiDoc: './api-v1/api-doc.yml',
//   apiDoc: apiDoc,
//   // dependencies: {
//   //   worldsService: v1WorldsService
//   // },
//   paths: './api-v1/paths'
// });

// For production (cf. https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
app.use(compression());
app.use(cors());
// Security: https://github.com/helmetjs/helmet
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


// Add RESTful API endpoint with Sofa at /api
// const openApi = OpenAPI({
//   schema,
//   info: {
//     title: 'Bio2KG Registry API',
//     version: '3.0.0',
//   },
// });
// app.use(
//   useSofa({
//       basePath: '/api',
//       schema,
//       onRoute(info) {
//           openApi.addRoute(info, {
//             basePath: '/api',
//           });
//         },
//   })
// );
// Add OpenAPI docs at /apidocs
// openApi.save('./swagger.yml');
// app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(openApi.get()));

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  database: "dsri-db",
  password : process.env.PASSWORD
});


// Serve searchkit-react at /
// app.use(express.static(path.join(__dirname__, ".", "public")));

app.post('/register', function (req: any, res: any) {
  console.log(req.body)
  const email = req.body.email;
  const data = req.body

  connection.query('INSERT INTO users SET ?', data, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send('Error: ' + error.sqlMessage);
      // throw error
    } else {
      res.send('User ' + email + ' registered successfully.');
    }
  });
});
// curl -X POST -d '{"email":"vincent@fr.fr", "username":"vincent", "affiliation":"IDS", "project_description":"Machine learning", "project_type": "ML", "gdpr":"accept"}' -H "Content-Type: application/json" http://localhost:4000/register
// curl -X POST -d "email=vincent@fr.fr,username=vincent" -H "Content-Type: application/x-www-form-urlencoded" http://localhost:4000/register

app.get('/stats', (req: any, res: any) => {
  const stats = {}
  connection.query('SELECT COUNT(*) AS count FROM users', function (error, result, fields) {
    if (error) {
      console.log(error)
      res.send('Error: ' + error.sqlMessage);
      // throw error
    } else {
      stats['number_of_users'] = result[0].count
      res.send(stats)
    }
  });
})
// get.apiDoc = {
//   summary: 'Returns worlds by name.',

app.get('/gpu/availability', (req: any, res: any) => {
  connection.query('SELECT * FROM gpu_schedule', function (error, result, fields) {
    if (error) {
      console.log(error)
      res.send('Error: ' + error.sqlMessage);
      throw error
    } else {
      res.send(result)
    }
  });
})

app.post('/gpu/request', function (req: any, res: any) {
  console.log(req.body)
  const user_email = req.body.user_email;
  const data = req.body

  // TODO: check if GPU available at the requested dates
  const check_gpu_query = `SELECT * FROM gpu_schedule 
  WHERE starting_date > CAST( ${data.starting_date} AS DATETIME )
  AND ending_date < CAST( ${data.ending_date} AS DATETIME )`

  connection.query(check_gpu_query, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send('Error: ' + error.sqlMessage);
      // throw error
    } else {
      res.send(results);
    }
  });

  connection.query('INSERT INTO gpu_schedule SET ?', data, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send('Error: ' + error.sqlMessage);
      // throw error
    } else {
      res.send('GPU scheduled successfully for ' + user_email);
    }
  });
});

app.get('/', (req: any, res: any) => {
  res.redirect('/api-docs');
})

// expressOasGenerator.handleRequests();
// expressOasGenerator.init(app, {});
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
