// src/index.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { parsePDF, splitTextIntoChunks } from './pdfUtils';
import { VectorStore, DocumentChunk } from './vectorStore';
import { UpstageClient } from './upstageClient';
import { ChatHandler } from './chatHandler';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// JSON 파싱 및 정적 파일 제공
app.use(express.json());
// __dirname은 src 폴더이므로 public은 상위 폴더에 위치
app.use(express.static(path.join(__dirname, '../public')));

// Multer를 사용한 파일 업로드 설정
const upload = multer({ dest: 'uploads/' });

// multer 파일 타입 확장을 위한 인터페이스
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const vectorStore = new VectorStore();
const upstageClient = new UpstageClient(process.env.UPSTAGE_API_KEY || '');
const chatHandler = new ChatHandler(upstageClient, vectorStore);

app.post('/upload', upload.single('file'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const filePath: string = req.file.path;
    console.log(`Uploaded file path: ${filePath}`);
    const pdfText: string = await parsePDF(filePath);
    const chunks: string[] = splitTextIntoChunks(pdfText, 500);
    const documentChunks: DocumentChunk[] = chunks.map((chunk, index) => ({
      id: `${req.file!.filename}-${index}`,
      content: chunk
    }));
    vectorStore.addChunks(documentChunks);
    console.log(`Added ${documentChunks.length} chunks.`);
    res.status(200).send("PDF processed and indexed successfully.");
  } catch (error) {
    console.error("Error in /upload:", error);
    res.status(500).send("Error processing the PDF.");
  }
});

app.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).send("Missing message.");
      return;
    }
    console.log(`Received chat message: ${message}`);
    const answer: string = await chatHandler.processChat(message);
    console.log(`Generated answer: ${answer}`);
    res.status(200).json({ answer, chatHistory: chatHandler.getChatHistory() });
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).send("Error processing chat message.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});