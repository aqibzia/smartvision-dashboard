const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./db');
const routes = require('./routes');

app.use(cors());
app.use(express.json());

// Mount all API routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
// if (process.env.NODE_ENV !== 'production') {
//   setTimeout(() => {
//     try {
//       console.log('\n✅ Registered Routes:');
//       app._router.stack.forEach((middleware) => {
//         if (middleware.route) {
//           console.log(`➡️ ${middleware.route.path}`);
//         } else if (
//           middleware.name === 'router' &&
//           middleware.handle?.stack
//         ) {
//           middleware.handle.stack.forEach((handler) => {
//             if (handler.route) {
//               console.log(`➡️ ${handler.route.path}`);
//             }
//           });
//         }
//       });
//     } catch (err) {
//       console.error('❌ Error printing routes:', err.message);
//     }
//   }, 100); // wait just enough for router stack to populate
// }
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});