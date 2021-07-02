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

    result.image = $(".mv_info_area").find("img").attr("src")

    callback(result);

}
module.exports = {parsing};