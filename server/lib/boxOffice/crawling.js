const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async(keyword) => {
    try{
        return await axios.get("https://movie.naver.com/movie/bi/mi/basic.nhn?code="+keyword)
    }catch(err){
        console.log(err)
    }
    
}

const parsing = async(keyword, result, callback) => {
    const html = await getHTML(keyword);
    
    const $ = cheerio.load(html.data); 

    let date = $(".info_spec").find("span:eq(3)").text().trim()
    date = date.replace(/(\r\n\t|\n|\r\t|\t)/gm,"")

    let genre = $(".info_spec").find("span:first").text().trim()
    genre = genre.replace(/(\r\n\t|\n|\r\t|\t)/gm,"")

    result.image = $(".mv_info_area").find("img").attr("src")
    result.summary = $(".story_area").find(".con_tx").text()
    result.genre = genre
    result.date = date
    callback(result);

}
module.exports = {parsing};