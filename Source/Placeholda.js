var Placeholda= new Class({
	initialize: function(){
		placeholders= $$('[placeholder]');
		if(!placeholders.length|| this.hasPlaceholder()){ return;}
		placeholders.each(this.placeholder.bind(this));
	},
	hasPlaceholder: function(){  //判断浏览器是否支持placeholder
		var input = new Element('input');
		return "placeholder" in input;
	},
	placeholder: function(obj){
		var _this= this;
		_this.input = obj;
		_this.label = new Element('label',{
			'class': 'fakeLabel_Placeholda',
			'name': obj.get('name'),  //可用于获取label元素。
			'html': obj.get('placeholder')
		});
		if(obj.value != ""){
			_this.label.style.display = "none";
		}
		_this.init();		
	},
	getxy : function(obj){
		var pos= obj.getPosition(obj.getOffsetParent());
		var pos= obj.getPosition();
		return {top: pos.y, left: pos.x}
	},
	getwh : function(obj){
		var siz= obj.getSize();
		return {w: siz.x, h: siz.y}
	},
	setPosition: function(label,input){
		var xy = this.getxy(input),
		wh = this.getwh(input);
		label.setStyles({
			'width': wh.w,
			'height': wh.h,
			'lineHeight': wh.h,
			'left': xy.left,
			'top': xy.top
		});
	},
	init : function(){
		var label = this.label,
		input = this.input;
		this.input.getParent().grab(this.label);
		label.addEvent('click',function(){
			this.addClass('dn');
			input.focus();
		});
		input.addEvents({
			'focus': function(){
				label.addClass('dn');
			},
			'click': function(){ //ie6 hack
				label.addClass('dn');
			},
			'blur': function(){
				if(!!!this.value){ //placeholder提示信息hack。
					label.removeClass('dn');
				};
			}
		});
		window.addEvent('resize',function(){
			this.setPosition(label,input);
		}.bind(this));
		this.setPosition(label,input);
	}
});