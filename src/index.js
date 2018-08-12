require('./css/select.scss');
require('./css/reset.css');
function Select(opt){
	var def = {
		el:'',
		data:null,
		placeholder:'请选择'
	};
	for(var key in def){
		this[key] = def[key];
	}
	for(var key in opt){
		if(def.hasOwnProperty(key)){
			this[key] = opt[key]
		}
	}
	return this.init()
}
Select.prototype.init = function(){
	var el = document.querySelector(this.el);
	var width = Number(el.getAttribute('width'));
	var height = Number(el.getAttribute('height'));
	var placeholder = el.getAttribute('placeholder');
	var frag = document.createDocumentFragment();
	var container = document.createElement('DIV');
	container.classList.add('yc_select_container');
	var input_container = document.createElement('DIV');
	input_container.className = 'input_container';
	var input_arrow = document.createElement('DIV');
	input_arrow.className = 'arrow';
	var input = document.createElement('INPUT');
	input.classList.add('yc_select_input');
	var enter = document.createElement('DIV');
	enter.className = 'yc_select';
	var arrow = document.createElement('DIV');
	arrow.classList.add('yc_select_arrow');
	var main = document.createElement('DIV');
	main.classList.add('yc_select_main');
	var div = document.createElement("DIV");
	div.classList.add('yc_select_ul');
	if(width!=''&&width){
		container.style.width = width+'px';
		input.style.width = width+'px';
		div.style.minWidth = width+'px';
	}
	if(height!=''&&height){
		input.style.height = height+'px';
		enter.style.top = height+'px';
	}
	if(placeholder){
		input.setAttribute('placeholder',placeholder);
	}
	else{
		input.setAttribute('placeholder',this.placeholder);
	}
	var li_arr = [];
	for(var item of this.data.slice(0,20)){
		var li = '<li>'+item+'</li>';
		li_arr.push(li);
	}
	var _li_arr = li_arr.join("");
	div.innerHTML = '<ul>'+_li_arr+'</ul>';
	input_container.appendChild(input);
	input_container.appendChild(input_arrow);
	container.appendChild(input_container);
	enter.appendChild(arrow);
	main.appendChild(div);
	var scrollBar_right = document.createElement('DIV');
	//var scrollBar = document.createElement('DIV');
	scrollBar_right.className = 'yc_select_scrollBar_right';
	main.appendChild(scrollBar_right);
	enter.appendChild(main);
	container.appendChild(enter);
	frag.appendChild(container);
	el.appendChild(frag);
	this.addFocusHandler(input);
	this.addClickHandler(container);
	this.addScrollHandler(div);
}
Select.prototype.getValue = function(){
	var el = document.querySelector(this.el);
	var target = el.querySelector('.yc_select_input');
	var value = target.value;
	return value;
}
Select.prototype.resetList = function(_data){
	var el = document.querySelector(this.el);
	var ul = el.querySelector('ul');
	var lis_arr = [];
	_data.forEach(function(elm){
		var li = '<li>'+elm+'</li>';
		lis_arr.push(li);
	})
	var _lis_arr = lis_arr.join("");
	ul.innerHTML = _lis_arr;
	// var li = ul.querySelector('li');
	// return li.length;
}
Select.prototype.addFocusHandler = function(target){
	var preValue;
	var self = this;
	var timeout;
	target.addEventListener('focus',function(e){
		preValue = e.target.value;
		target.select();
	})
	target.addEventListener('blur',function(e){
		var target = e.target;
		var parent = target.parentElement.parentElement;
		var div = parent.lastElementChild;
		var arrow = parent.querySelector('.yc_select_arrow');
		setTimeout(function(){
			//var bottom = target.getBoundingClientRect().bottom;
			//var client_height = window.screen.height;
			div.style.maxHeight = '0px';
			var after = parent.querySelector('.arrow');
			after.style.transform = 'rotate(45deg)';

			//arrow.style.display = 'none';
			//div.style.borderWidth = '0px';
		},50)
		console.log(e.target.value);
		var if_exsit = self.data.filter(function(item){
			if(item == e.target.value){
				return item
			}
		})
		if(if_exsit.length == 0){
			e.target.value = '';
		}

	})
	target.addEventListener('click',function(e){
		self.resetList(self.data.slice(0,20));
		var target = e.target;
		var parent = target.parentElement.parentElement;
		var div = parent.lastElementChild;
		var lis = parent.getElementsByTagName('LI');
		var cli = parent.querySelector('li.active');
		if(cli){
			cli.classList.remove('active');
		}
		var val = target.value;
		if(val != ''){
			try{
				self.data.forEach(function(e,index){
					//console.log
					if(e == val){
						if(index<lis.length){
							lis[index].classList.add('active');
						}	
						throw new Error('find');
					}
				})
			}catch(e){
				if(e.message != 'find'){
					throw e;
				}
			}
		}
		if(div.offsetHeight != 0){
			target.blur();
		}else{
			// var bottom = target.getBoundingClientRect().bottom;
			// var client_height = window.screen.height;
			// if(client_height-bottom<230){
			// 	div.style.maxHeight = '200px';
			// 	div.style.top = '-200px';
			// 	div.style.transformOrigin = 'center bottom 0px';
			// 
			//arrow.style.display = 'block';
				div.style.maxHeight = '200px';
			var after = parent.querySelector('.arrow');
			after.style.transform = 'rotate(225deg)';
			//div.style.borderWidth = '1px';
		}
	})
	target.addEventListener('input',function(e){
		clearTimeout(timeout);
		timeout = setTimeout(function(){
			var _val = e.target.value;
			var _data = [];
			self.data.forEach(function(item){
				if(item.indexOf(_val)>-1){
					_data.push(item);
				}
			})
			self.resetList(_data);
		},500)
	})
}
Select.prototype.addClickHandler = function(target){
	target.addEventListener('click',function(e){
			if(e.target.tagName == 'LI'){
			var input = target.querySelector('input');
			input.value = e.target.textContent;
		}
	})
}
Select.prototype.addScrollHandler = function(target){
	var self = this;
	target.addEventListener('scroll',function(e){
		var scrollTop = e.target.scrollTop;
		var bar = e.target.parentElement.querySelector('.yc_select_scrollBar_right');
		var bili = (scrollTop)*200/(self.data.length*26);
		if(bili>145){
			bili = 145;
		}
		if(bili<2){
			bili = 2;
		}
		bar.style.top = bili+'px';
		//console.log(scrollTop);
		//console.log(e.target.scrollHeight);
		if((scrollTop+200)>e.target.scrollHeight){
			var length = target.querySelectorAll('li').length;
			self.resetList(self.data.slice(0,length+20));
		}


	})
}
export default Select

