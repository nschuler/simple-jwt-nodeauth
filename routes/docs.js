import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../docs/swaggerOptions.js';

// initialize router
const router = express.Router();

const specs = swaggerJsdoc(swaggerOptions);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs, { explorer: true }));

export default router;