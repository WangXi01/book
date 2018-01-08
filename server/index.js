const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const http = require('http')
const fs = require('fs')
const iconv = require('iconv-lite')

//app.use('/', function(req, res, next) {
//	res.header('Access-Control-Allow-Origin', '*');
//	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//	next();
//});

app.get('/getText', function(req, res) {

});

const url = 'http://www.81zw.com/book/8634/745331.html'
//开始章节数
let i = 1
let linkNum = 1
//最大获取章节数
let num = 5

function main(url) {
	startRequest(url)
}

function startRequest(url) {
	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			$ = cheerio.load(iconv.decode(body, 'gbk'));
			
			const title = $('.bookname h1').text()
             const arr = []
             const content = $("#content").html()
             //分析结构后分割html
             const contentArr = content.split('<br><br>')
             contentArr.forEach(elem => {
                 //去除内容的两端空格和&nbsp;
                 const data = trim(elem.toString())
                 arr.push(data)
             })
//			const title = $('#BookCon h1').text()
//			var arr = ''
//			$("#BookText p").each(function(index){
//				arr = arr + '<p>'+$(this).text()+'</p>'
//			})
//			var arr = arr.replace(/(\t)|(\s)|(\?)/g, '');
//			arr.forEach(elem => {
//				//去除内容的两端空格和&nbsp;
//				const data = trim(elem.toString())
//				arr.push(data)
//			})
			const bookName = $(".con_top a").eq(2).text()
			//定义存入数据库的对象
			const obj = {
				id: i,
				linkNum:num,
				err: 0,
				bookName: bookName,
				title: title,
				content: arr
			}
//			var link;
//			$(".link.xb a").each(function(index){
//				if($(this).text()=='下一章'){
//					link = $(this).attr('href')
//				}
//			})
//			if(!link){
//				return false;
//			}
//			//获取当前章节的下一章地址，递归调用fetchPage
//			const nextLink = `http://www.jianlaixiaoshuo.com${link}`
//			saveContent(obj, nextLink)
			let url2 = url.split('/')[url.split('/').length - 2]
            const link = $(".bottem2 a").eq(2).attr('href')
            //获取当前章节的下一章地址，递归调用fetchPage
            const nextLink = `http://www.81zw.com/book/${url2}/${link}`
            saveContent(obj, nextLink)
			console.log(`${i}--${obj.title}`)
			console.log(`第${i + 1}章：${nextLink}`)
			i++
			linkNum = link.match(/\d+/);
			if(i <= num) {
				setTimeout(() => {
					main(nextLink)
				}, 100)
			}

		}
	})
}

function saveContent(obj, nextLink) {
	//判断书名文件夹是否存在，不存在则创建
	if(!fs.existsSync(`../static/data/${obj.bookName}`)) {
		fs.mkdirSync(`../static/data/${obj.bookName}`)
	}
	//写入json文件
	fs.writeFile(`../static/data/${obj.bookName}/chapter${linkNum}.json`, JSON.stringify(obj), 'utf-8', err => {
		if(err) throw err
	})
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '').replace(/&nbsp;/g, '')
}

main(url)



app.get('/list', function(req, res) {

	request('https://www.qu.la/book/31177/', function(error, response, body) {
		if(!error && response.statusCode == 200) {
			
			$ = cheerio.load(body);
			var html = $('#list dl').html();
			var new_html = html.toString().replace(/(href)=(\")(\/)/g,function($0,$1,$2,$3){
				return $1 + '=' + $2 + '/#' + $3;
			})
			res.json({
				listTitle: new_html,
			});
		}
	})
});

var server = app.listen(3000, function() {
	console.log('listening at 3000');
});