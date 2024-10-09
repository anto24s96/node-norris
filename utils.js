const axios = require("axios");
const fs = require("fs");
const path = require("path");

//funzione per leggere in norrisDB.json
const readJSONData = (fileName) => {
    const filePath = path.join(__dirname, `${fileName}.json`);
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
};

//funzione per scrittura in norrisDB.json
const writeJSONData = (fileName, newData) => {
    const filePath = path.join(__dirname, `${fileName}.json`);
    const fileString = JSON.stringify(newData);
    fs.writeFileSync(filePath, fileString);
};

//funzione per fare la chiamata API
const getApi = async () => {
    try {
        const response = await axios.get("https://api.chucknorris.io/jokes/random");
        //Recupero la battuta
        const newJoke = response.data.value;
        //Creo una variabile per la lettura del DB
        let norrisDB = readJSONData("norrisDB");

        //Se la battuta non è gia presente la aggiungo facendo una verifica
        if (!norrisDB.includes(newJoke)) {
            norrisDB.push(newJoke);
            //Scrittura nel db
            writeJSONData("norrisDB", norrisDB);
            console.log(`${newJoke} | è stato aggiunto`);

            return newJoke;
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = getApi;
