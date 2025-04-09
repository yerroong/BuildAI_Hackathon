"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const pdfUtils_1 = require("./pdfUtils");
const vectorStore_1 = require("./vectorStore");
const upstageClient_1 = require("./upstageClient");
const chatHandler_1 = require("./chatHandler");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// JSON 파싱 및 정적 파일 제공
app.use(express_1.default.json());
// __dirname은 src 폴더이므로 public은 상위 폴더에 위치
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Multer를 사용한 파일 업로드 설정
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const vectorStore = new vectorStore_1.VectorStore();
const upstageClient = new upstageClient_1.UpstageClient(process.env.UPSTAGE_API_KEY || '');
const chatHandler = new chatHandler_1.ChatHandler(upstageClient, vectorStore);
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send("No file uploaded.");
            return;
        }
        const filePath = req.file.path;
        console.log(`Uploaded file path: ${filePath}`);
        const pdfText = await (0, pdfUtils_1.parsePDF)(filePath);
        const chunks = (0, pdfUtils_1.splitTextIntoChunks)(pdfText, 500);
        const documentChunks = chunks.map((chunk, index) => ({
            id: `${req.file.filename}-${index}`,
            content: chunk
        }));
        vectorStore.addChunks(documentChunks);
        console.log(`Added ${documentChunks.length} chunks.`);
        res.status(200).send("PDF processed and indexed successfully.");
    }
    catch (error) {
        console.error("Error in /upload:", error);
        res.status(500).send("Error processing the PDF.");
    }
});
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            res.status(400).send("Missing message.");
            return;
        }
        console.log(`Received chat message: ${message}`);
        const answer = await chatHandler.processChat(message);
        console.log(`Generated answer: ${answer}`);
        res.status(200).json({ answer, chatHistory: chatHandler.getChatHistory() });
    }
    catch (error) {
        console.error("Error in /chat:", error);
        res.status(500).send("Error processing chat message.");
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
