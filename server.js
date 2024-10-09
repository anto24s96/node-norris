require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

const getApi = require("./utils.js");

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} | ${req.url} effettuata`);

    // Ignoro la richiesta per la favicon.ico
    if (req.url === "/favicon.ico") {
        res.writeHead(204); // Nessun contenuto
        res.end();
        return;
    }

    //Recupero await della funzione e catch per gestire l'errore nel recupero
    const joke = await getApi().catch(() => "Errore nel recupero della battuta");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>${joke}</h1>`);
});

server.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
});
