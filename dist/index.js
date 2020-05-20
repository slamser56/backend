"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
app.use(cors_1.default({
    credentials: true,
}));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: false }));
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use('/api/post', routes_1.default.post); // константы
app.use('/api/phone', routes_1.default.phone);
app.use('/api/profile', routes_1.default.profile);
app.post('/api', (req, res) => {
    return res.status(200).send();
}); // переместить 
app.listen(process.env.PORT, () => {
    database_1.database()
        .then((res) => {
        console.log(`Backend listening on ${process.env.PORT} port!`);
    })
        .catch((err) => {
        console.log(err);
    }); // написать логгер
});
//# sourceMappingURL=index.js.map