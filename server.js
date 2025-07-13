# Generate fixed backend project with required files including package.json
backend_fixed_files = {
    "backend/server.js": """\
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';
import contactRoutes from './routes/contact.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
""",
    "backend/package.json": """\
{
  "name": "wireframing-backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^7.0.3"
  }
}
""",
    "backend/routes/auth.js": """\
import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ token: 'mock-token' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'User registered' });
});

export default router;
""",
    "backend/routes/portfolio.js": """\
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ portfolio: [] });
});

export default router;
""",
    "backend/routes/contact.js": """\
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Contact message received' });
});

export default router;
"""
}

# Write and zip files
fixed_backend_zip_path = "/mnt/data/wireframing-backend-fixed.zip"
with ZipFile(fixed_backend_zip_path, 'w') as zipf:
    for path, content in backend_fixed_files.items():
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            f.write(content)
        zipf.write(path)

fixed_backend_zip_path

