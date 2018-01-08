// sql语句
var sqlMap = {
	// 用户
	user:{
		add:'insert into user(id, name, password) values (0, ?, ?)',
	},
	// 博客
	title: {
		add: 'insert into title(id, name, tag, content, create_time) values (0, ?, ?, ?, ?)',
		select: 'select * from title',
	}
}
module.exports = sqlMap;