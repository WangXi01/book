const getItem = function getItem(num){
	var item = null;
	switch(num){
		case '1':
			item='玄幻小说';
			break;
		case '2':
			item='修真小说';
			break;
		case '3':
			item='都市小说';
			break;
		case '4':
			item='历史小说';
			break;	
		case '5':
			item='网游小说';
			break;	
		case '6':
			item='科幻小说';
			break;	
		case '7':
			item='言情小说';
			break;	
		case '8':
			item='其他小说';
			break;	
		case '9':
			item='全本小说';
			break;	
	}
	return item;
}

const getNum = function getNum(item){
	var num = null;
	switch(item){
		case '玄幻小说':
			num='1';
			break;
		case '修真小说':
			num='2';
			break;
		case '都市小说':
			num='3';
			break;
		case '历史小说':
			num='4';
			break;	
		case '网游小说':
			num='5';
			break;	
		case '科幻小说':
			num='6';
			break;	
		case '言情小说':
			num='7';
			break;	
		case '其他小说':
			num='8';
			break;	
		case '全本小说':
			num='9';
			break;	
	}
	return num;
}

export {getItem,getNum};
