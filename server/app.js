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


var models = require('./db/db');
var $sql = require('./db/sqlMap');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var conn = mysql.createConnection(models.mysql);

conn.connect();

let total = 0 //总章节数
let id = 745331 //计数器
const chapters = 1187 //爬取多少章
const url = 'http://www.zwdu.com/book/8634/'

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

function fetchUrl(url, callback, id,titleLink) {
	superagent.get(url)
		.charset('gbk')
		.end(function(err, res) {
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
//			console.log(titleLink)
			const obj = {
				id: id,
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
			let urls = []
			total = $('#list dd').length
			console.log(`共${$('#list dd').length}章`)
			var html = $('#list dl').html();
			var new_html = html.toString().replace(/(href)=(\")(\/)/g,function($0,$1,$2,$3){
				return $1 + '=' + $2 + '/#' + $3;
			})
			
			var titleLink;
			$('#list dd').each(function(i, v) {
				if(i < chapters) {
					urls.push('http://www.zwdu.com' + $(v).find('a').attr('href'))
				}
				
			})
			async.mapLimit(urls, 10, function(url, callback) {
				fetchUrl(url, callback, id,titleLink) 
			}, function(err, results) {
				//写入json文件
				fs.writeFile(`../static/data/${results[0].bookName}/list.json`, JSON.stringify(new_html), 'utf-8', err => {
					if(err) throw err
				})
				
				results.forEach(function(index){
					console.log('进入'+index.title)
					saveContent(index)
					var sql = 'insert into bookContent(id, bookName, title,content, titleLink) values (0, ?, ?, ?, ?)'
					conn.query(sql,[index.bookName,index.title,index.content,index.titleLink],function(err, result) {
						if(err) {
							console.log(err);
						}
						if(result) {
							console.log(index.title + '------成功')
						}
					})
				})
			})
		})
}
 
//main(url)

function saveContent(obj) {
	//判断书名文件夹是否存在，不存在则创建
	if(!fs.existsSync(`../static/data/${obj.bookName}`)) {
		fs.mkdirSync(`../static/data/${obj.bookName}`)
	}
	//写入json文件
	fs.writeFile(`../static/data/${obj.bookName}/chapter${obj.titleLink}.json`, JSON.stringify(obj), 'utf-8', err => {
		if(err) throw err
	})
}

app.get('/selectBook',(req,res)=>{
	var sql = `select * from bookContent where titleLink='${req.query.bookLink}'`
	conn.query(sql,function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			res.json(result);
		}
	})
})

app.listen(3000, function() {
	console.log('server listening on 3000')
})