import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from "path";
// import * as swaggerUi from 'swagger-ui-express';


// Create new types in the GraphQL query: https://www.searchkit.co/docs/customisations/changing-graphql-types
// PrefixCommons API: https://github.com/prefixcommons/prefixcommons-api/blob/master/slim-server/SwaggerServer/index.php

// Now we define the Express server:
export const app = express();

// For production (cf. https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
app.use(compression());
app.use(cors());
// Security: https://github.com/helmetjs/helmet
app.use(helmet({
  contentSecurityPolicy: false,
}));


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



// Serve searchkit-react at /
app.use(express.static(path.join(__dirname__, ".", "public")));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
