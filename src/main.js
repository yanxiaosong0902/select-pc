import Select from './index.js'

	var opt = {
		el:'#test',
		data:[
		'12312','454sd','sdaf4sd4','4444444444444444444444444444','545sdf','5445fsd','fsd4755','测试','我爱你中国','世界水电费','士大夫22人',
		'12312二','454sd二','sdaf4sd4二','4444444444444444444444444444二','545sdf二','5445fsd二','fsd4755二','测试二','我爱你中国二','世界水电费','士大夫22人',
		'12312三','454sd三三','sdaf4sd4','4444444444444444444444444444三','545sdf三','5445fsd三','fsd4755三','测试三','我爱你中国三','世界水电费','士大夫22人',
		'12312四','454sd四','sdaf4sd4四','4444444444444444444444444444四','545sdf四','5445fsd四','fsd4755四','测试四','我爱你中国四','世界水电费','士大夫22人',
		'12312五','454sd五','sdaf4sd4五','4444444444444444444444444444五','545sdf五','5445fsd五','fsd4755五','测试五','我爱你中国五','世界水电费','士大夫22人'
		]
	}
	var test = new Select(opt);
	var opt = {
		el:'#test2',
		data:[1,2,3]
	}
	var test2 = new Select(opt);

window.yxs = test;