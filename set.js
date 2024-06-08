const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUJ3Uk1iKytRdHdBU0QrOGFrWjBVaVFGVDlNQ0RnVThWZUh1R0VtamxtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnJCZmRkTERZRms4VVZZK0FYL1RwUi9laFJqQzFCQmNWY1A1QmRIRkZVdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTDJtb2xjbFlxRWJ1VGVKMTlscDROY2tUSTVTem1iV1hvNXRCbVBZSVd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzKzQwUmFOMzl1M1U3cnRVcm1GNUpnbjJKbWlZd0hZNHRPQmMvYVIxamgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdFNmVNUFl1M2pYZVRRN1laR1Z2bHlOTFZoNjFmMkRaeUFLZmFoM1JDV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIb2VKdUJ3V09VY3dZNW5zYzI4bTZMY0djQjZmTDlZU0VIOEI5UlAyaFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdxQlNrWVFKYUJiZmdKWi93M0JvSGFPTk9yZHlBYzRTb21jL0tSMzJIST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXovS0lqcUsra0EvcmdETVBzQnFIeFNKWENxQTY3K0tDK2dvaG1laTFoYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhvNkRQQThIWnk0Z09OZnc5RWRRR3BGZWhXWDNBdHBmQ1VxRGUvdmwyREc5alErTkhKRWVOZHRyQ2JCS2RKb2hhMFJQYmdnZS91dzBkYnlQalNrNER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTcsImFkdlNlY3JldEtleSI6ImhJcUc4Ymg5cUZWczR4UCtDKzBvWExEbUt0RWVyMHJRT0RlS0VBSnRqeDA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQzNDQ1MDQxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjMwRUY3NDkwNjVCRkVBMzk5MDM5NzI1MDc5ODQ2NzU1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTc3ODU4NzN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkhmZWk0YjZ0UUZPSHNyRWNENlhsdEEiLCJwaG9uZUlkIjoiOGE2ZWVhNGItNjc4MC00ZjVlLTg4NmItOTNjMDVlNWYxY2NjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFzL3FDa1dOY0ZGamlVVGVhLzRReUpZNTE4OD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWeEt0N3BlL2Z2NUltNkxkR2RrWThlOHZGdW89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1hSSlhGM0MiLCJtZSI6eyJpZCI6IjI1NDc0MzQ0NTA0MTo4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkphcGFuZXNlbW9uayJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGZNcjk4Q0VQeXBqYk1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZUxGWmpXWlh2R2pOUFIzSDY3VzNaMFBmbXZSTkx5Z0Z4bGtpNkZjN1pYdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidHFtTGJQVWhFdVdBZ0VTWnUxTmZCZmxranBDMDJ5YXc0eTQ0YUF3bThsN1d2bXlpbWllN2ZQakJqWVlCTEVaTVF0WlQrd1M3S0VVWXlMZmIyNUVzQWc9PSIsImRldmljZVNpZ25hdHVyZSI6ImZNVFllTTVNWHR2bnZjemR5WUIzNzBFd25GTGkyemJIanRwVXQvZ2wrUHlqaHpXNWpURGpkYmRLNFVyWW5YTzFIeUdvVkZrZ3MzeGhVV0hrcDYyRURBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQzNDQ1MDQxOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWGl4V1kxbVY3eG96VDBkeCt1MXQyZEQzNXIwVFM4b0JjWlpJdWhYTzJWOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNzc4NTg2NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMNSsifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Gifted Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254742582367,254743445041", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

