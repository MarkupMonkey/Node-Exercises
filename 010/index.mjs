import * as fs from "node:fs";

fs.writeFile("file-for-you.txt", "What a wonderful day", "utf8", (err) => {
    if (err) throw err;
    console.log('Il messaggio è arrivato, file salvato\nThe message has arrived, file saved')
})