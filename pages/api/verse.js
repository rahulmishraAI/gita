import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { chapter, verse } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'data', 'gita.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const gitaData = JSON.parse(jsonData);

    if (gitaData[chapter] && gitaData[chapter][verse]) {
      return res.status(200).json(gitaData[chapter][verse]);
    } else {
      return res.status(404).json({ error: 'Verse not found. Please check your input.' });
    }
  } catch {
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
