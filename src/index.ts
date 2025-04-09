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

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

// multer를 이용한 파일 업로드 설정 (파일은 uploads 폴더에 임시 저장됨)
const upload = multer({ dest: 'uploads/' });

// Request 타입에 multer의 file 속성을 확장합니다.
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const vectorStore = new VectorStore();
const upstageClient = new UpstageClient(process.env.UPSTAGE_API_KEY || '');
const chatHandler = new ChatHandler(upstageClient, vectorStore);

// PDF 파일 업로드 엔드포인트
app.post('/upload', upload.single('file'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const filePath: string = req.file.path;
    const pdfText: string = await parsePDF(filePath);
    const chunks: string[] = splitTextIntoChunks(pdfText, 500);
    const documentChunks: DocumentChunk[] = chunks.map((chunk, index) => ({
      id: `${req.file!.filename}-${index}`,
      content: chunk
    }));
    vectorStore.addChunks(documentChunks);
    res.status(200).send("PDF processed and indexed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the PDF.");
  }
});

// 챗 엔드포인트
app.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).send("Missing message.");
      return;
    }
    const answer: string = await chatHandler.processChat(message);
    res.status(200).json({ answer, chatHistory: chatHandler.getChatHistory() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing chat message.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});