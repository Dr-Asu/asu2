import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw)
    throw `💝 QUEEN HENTAI 💝  does not support NSFW.\n\nTo turn it on, use: ${usedPrefix}on nsfw \n\n🤤🤤🤤🤤🤤🤤🤤🤤🤤`;

  let user = global.db.data.users[m.sender].age;
  if (user < 17)
    throw `Bza,18+ hode. 😁 Age must be 18`;

  if (!text)
    throw `💝 QUEEN HENTAI 💝 , What do you want to search on 💝 QUEEN HENTAI 💝?\n📌 Usage: ${usedPrefix + command} <search>\n\nEx:Mia කලීපා 🤣  or bza can use a link \nEx: .xnxx link *`;

  m.react(rwait);

  if (text.includes('http://') || text.includes('https://')) {
    if (!text.includes('xnxx.com'))
      return m.reply(`Invalid link. Only *xnxx.com*, Generated 💝 QUEEN HENTAI 💝`);

    try {
      let xnResponse = await fetch(
        `https://guru-scrapper.cyclic.app/api/xnxxdl?url=${encodeURIComponent(text)}`
      );
      let xnJson = await xnResponse.json();

      console.log('XNXX DL Response:', xnJson);

      if (xnJson.data && xnJson.data.high) {
        conn.sendFile(
          m.chat,
          xnJson.data.high,
          'xnxx_video.mp4',
          `Queen Hentai Adult Video
          Downloader


            
 🇱🇰  Title: ${xn.result.title}


 🇱🇰  Duration: ${xn.result.duration}


 🇱🇰  Quality: ${xn.result.quality}
          `.trim(),
          m,
          false,
          { asDocument: chat.useDocument }
        );

        m.react(done);
      } else {
        console.error('XNXX DL Error: Invalid response format');
        m.reply(`💝 QUEEN HENTAI 💝 Error`);
      }
    } catch (e) {
      console.error('XNXX DL Error:', e);
      m.reply(`💝 QUEEN HENTAI 💝 Error`);
    }
  } else {
    try {
      let searchResponse = await fetch(
        `https://guru-scrapper.cyclic.app/api/xnxxsearch?query=${encodeURIComponent(text)}`
      );
      let searchJson = await searchResponse.json();

      console.log('XNXX Search Response:', searchJson);

      if (searchJson.data && searchJson.data.length > 0) {
        let listSections = [];
        searchJson.data.forEach((result, index) => {
          listSections.push([
            `${index}┃ ${result.title}`,
            [['🎥 MP4', `${usedPrefix}xnxxdl ${result.link}`, `▢ 📌 *Title* : ${result.title}`]],
          ]);
        });

        let ff = searchJson.data
          .map((result, i) => `${i + 1}┃ *Title* : ${result.title}\n*Link:* ${result.link}\n`)
          .join('\n');

        m.reply(ff);
      } else {
        console.error('XNXX Search Error: No results found');
        m.reply(` No results found for the 💝 QUEEN HENTAI 💝 search list.`);
      }
    } catch (e) {
      console.error('XNXX Search Error:', e);
      m.reply(`💝 QUEEN HENTAI 💝 Error`);
    }
  }
};

handler.help = ['xnxx'];
handler.tags = ['nsfw', 'prem'];
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx'];
handler.diamond = false;
handler.premium = false;
handler.group = true
handler.register = true;

export default handler;
