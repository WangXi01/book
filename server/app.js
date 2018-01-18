const cheerio = require('cheerio')
const express = require('express')
const app = express()
const superagent = require('superagent')
require('superagent-charset')(superagent)
const async = require('async');
const fs = require('fs');
const request = require('request');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const memoryCache = require('memory-cache');


var models = require('./db/db');
var $sql = require('./db/sqlMap');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var conn = mysql.createPool(models.mysql);

app.use('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

var titleNum = 0 //初始章节
let id = 10167795 //计数器
const url = 'https://www.zwdu.com/book/26906/' 
var linkArr =  ["https://www.zwdu.com/book/31392/", "https://www.zwdu.com/book/31391/", "https://www.zwdu.com/book/31390/", "https://www.zwdu.com/book/31379/", "https://www.zwdu.com/book/31343/", "https://www.zwdu.com/book/31294/", "https://www.zwdu.com/book/31249/", "https://www.zwdu.com/book/31205/", "https://www.zwdu.com/book/31197/", "https://www.zwdu.com/book/31179/", "https://www.zwdu.com/book/31122/", "https://www.zwdu.com/book/31044/", "https://www.zwdu.com/book/31036/", "https://www.zwdu.com/book/30971/", "https://www.zwdu.com/book/30803/", "https://www.zwdu.com/book/30797/", "https://www.zwdu.com/book/30722/", "https://www.zwdu.com/book/30666/", "https://www.zwdu.com/book/30614/", "https://www.zwdu.com/book/30587/", "https://www.zwdu.com/book/30505/", "https://www.zwdu.com/book/30499/", "https://www.zwdu.com/book/30486/", "https://www.zwdu.com/book/30477/", "https://www.zwdu.com/book/30458/", "https://www.zwdu.com/book/30416/", "https://www.zwdu.com/book/30362/", "https://www.zwdu.com/book/30345/", "https://www.zwdu.com/book/30297/", "https://www.zwdu.com/book/30288/"]





//for(let i=0;i<linkArr.length;i++){
//	setTimeout(function(){
////		main(linkArr[i])
////		getBook(linkArr[i])
//	},1000*3*i)
//} 

//http://www.biquge.lu/book/35702/

//去除前后空格和&nbsp;转义字符
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '').replace(/&nbsp;/g, '')
}

//将Unicode转汉字
function reconvert(str) {
	str = str.replace(/(&#x)(\w{1,4});/gi, function($0) {
		return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
	});
	return str
}

function fetchUrl(url, callback,titleLink) {
	superagent.get(url)
		.charset('gbk')
		.end(function(err, res) {
			if(err){
				console.log(url)
			}
			let $ = cheerio.load(res.text)
			const arr = []
			const content = reconvert($("#content").html())
			//分析结构后分割html
			const contentArr = content.split('<br><br>')
			contentArr.forEach(elem => {
				const data = trim(elem.toString())
				arr.push(data)
			})
			var newArr = '';
			arr.forEach(function(index){
				newArr = newArr + index + '<br>';
			})
			var titleLink = url.match(/\/(\w+).html/)[1];
			titleNum++
			console.log('当前url:'+url+',当前第'+titleNum+'章',$('.bottem1 a').eq(2).attr('href')) 
			var nextElement = $('.bottem1 a').eq(2).attr('href').match(/\/(\w+).html/);
			if(nextElement == null){
				var nextLink = null;
			}else{
				var nextLink = nextElement[1];
			}
			const obj = {
				nextLink: nextLink,
				titleLink:titleLink,
				err: 0,
				bookName: $('.footer_cont a').text(),
				title: $('.bookname h1').text(),
				content: newArr
			}
			callback(null, obj)
		})
}

function main(url){
	superagent.get(url)
		.charset('gbk')
		.end(function(err, res) {
			var $ = cheerio.load(res.text);
			let urls = [];
			const chapters = $('#list dd').length;
			console.log(`共${$('#list dd').length}章`);
			var html = $('#list dl').html();
			var new_html = html.toString().replace(/(href)=(\")(\/)/g,function($0,$1,$2,$3){
				return $1 + '=' + $2 + '/#' + $3; //hash路由拼接
			})
			var titleLink;
			$('#list dd').each(function(i, v) {
				if(i < chapters) {
					urls.push('http://www.zwdu.com' + $(v).find('a').attr('href'))
				}
				
			})
			async.mapLimit(urls, 10, function(url, callback) {
				fetchUrl(url, callback,titleLink)
			}, function(err, results) {
				var sql = 'insert into bookcontent(id, bookName, title,content, titleLink, nextLink,type) values (0, ?, ?, ?, ?, ?, ?)';
				var bookType = '其他小说';
				results.forEach(function(index){
					var selectSql = `select id from bookcontent where titleLink='${index.titleLink}' and bookName='${index.bookName}'`
					conn.query(selectSql,function(err, result) {
						if(err) {
							console.log(err);
						}
						if(result) {
							if(result.length!=0){
								console.log(index.bookName+'的'+index.titleLink + '------已存在')
							}else{
								conn.query(sql,[index.bookName,index.title,index.content,index.titleLink,index.nextLink,bookType],function(err, result) {
									if(err) {
										console.log(err);
									}
									if(result) {
										console.log(index.title + '------写入数据库成功')
									}
								})
							}
						}
					})
					
					
				})
			})
		})
}
 
//main(url)
//getBook(url) 
function getBook(url){
	superagent.get(url)
		.charset('gbk')
		.end(function(err, res) {
			var $ = cheerio.load(res.text);
//			var hotcontent = $('#hotcontent .item');
			var hotcontent = $('.box_con').eq(0);
			var sql = 'insert into bookauthor(id, title, author, intro, link, type) values (0, ?, ?, ?, ?, ?)'
			
			hotcontent.each(function(i,v){
//				var bookTitle = $(v).find('dl').find('a').text()
//				var author = $(v).find('dl').find('span').text();
//				var intro = $(v).find('dl').find('dd').text().replace(/(&nbsp;)|(\s)/g, '');
				var bookTitle = $(v).find('#info').find('h1').text()
				var author = $(v).find('#info').find('p').eq(0).text()
				var intro = $(v).find('#intro').find('p').eq(0).text().replace(/(&nbsp;)|(\s)/g, '');
				var type = $(v).find('.con_top a').eq(1).text();
				if(intro.length>50){ //截取简介
					intro = intro.substring(0,32)+'...'
				}
				var bookLink = $(v).find('img').attr('src');
				if(!bookLink.match(/https/g)){ //分类下图片link缺少base网址的处理
					var bookLink = 'https://www.zwdu.com' + bookLink;
				}
				var selectSql = `select id from bookauthor where title='${bookTitle}'`
				conn.query(selectSql,function(err, result) {
					if(err) {
						console.log(err);
					}
					if(result) {
						if(result.length!=0){
							console.log(bookTitle + '------已存在')
						}else{
							conn.query(sql,[bookTitle,author,intro,bookLink,type],function(err, result) {
								if(err) {
									console.log(err);
								}
								if(result) {
									console.log(bookTitle + '------成功')
								}
							})
						}
					}
				})
				
				
			})
			
		})
}

//function saveContent(obj) {
//	//判断书名文件夹是否存在，不存在则创建
//	if(!fs.existsSync(`../static/data/${obj.bookName}`)) {
//		fs.mkdirSync(`../static/data/${obj.bookName}`)
//	}
//	//写入json文件
//	fs.writeFile(`../static/data/${obj.bookName}/chapter${obj.titleLink}.json`, JSON.stringify(obj), 'utf-8', err => {
//		if(err) throw err
//	})
//}

app.get('/selectBook',(req,res)=>{
	console.log(memoryCache.get(req.query.bookName))
	if(memoryCache.get(req.query.bookName)){
		res.json(memoryCache.get(req.query.bookName))
		return false;
	}
	if(req.query.bookName && !req.query.bookLink && !req.query.pageSize){//列表
		console.log('1')
		var sql = `select id from bookcontent where bookName='${req.query.bookName}'`
	}else if(req.query.bookLink && !req.query.bookName){//正文
		console.log('2')
		var sql = `select bookName,title,content,nextLink from bookcontent where titleLink='${req.query.bookLink}'`
	}else if(req.query.bookName && req.query.pageSize){
		console.log('3')
		var sql = `select titleLink,title from bookcontent where bookName='${req.query.bookName}'  order by titleLink Limit ${req.query.initPage},${req.query.pageSize}`
	}else if(req.query.item){
		console.log('4')
		var sql = `select * from bookauthor where type='${req.query.item}'`
	}
	conn.query(sql,function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			if(req.query.bookName && req.query.pageSize){
				memoryCache.put(req.query.bookName,result)
			}
			res.json(result);
		}
	})
})

app.get('/homebook',(req,res)=>{
	var sql = `select * from bookauthor ORDER BY RAND() Limit 0,12`;
	conn.query(sql,function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			memoryCache.put('home',result)
			res.json(result);
		}
	})
})

app.listen(3000, function() {
	console.log('server listening on 3000')
})