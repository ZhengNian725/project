new Vue({
	el:"#app",
	data:{
		data : this.data,
		checkedall:false,
		totalMoney:0,
		delFlag:false,
		curProduct:undefined
	},
	//过滤器
	filters:{
		formatMoney:function (value){
			return "￥"+value.toFixed(2);
		}
	},
	//生命周期函数
	mounted:function(){
		this.$nextTick(()=>{
			this.cartView();
		})
	},
	//调用方法
	methods:{
		//通过http服务获取数据
		cartView:function(){
			this.$http.get("data/cartData.json").then(res=>{
				console.log(res.data.result.list);
				this.data = res.data.result.list;
			})
		},
		//设置单选及全选判断
		selectedProduct:function(item){
			var _this = this;
			if(typeof item.checked == 'undefined'){
				this.$set(item,"checked",true);
				this.caleTotalPrice()
				this.data.some(function(val,index){
					if(val.checked == true){
						_this.checkedall = true;
					}else{
						_this.checkedall = false;
						return true;
			}
				})
				
			}else{
				item.checked = !item.checked
				this.caleTotalPrice()
				this.data.some(function(val,index){
					if(val.checked == true){
						_this.checkedall = true;
					}else{
						_this.checkedall = false;
						return true;
					}
				})
			}
		},
		//全选
		checkedAll:function(flag){
			this.checkedall=flag;
			var _this = this;
			this.data.forEach(function(val,index){
					if(typeof val.checked == 'undefined'){
						_this.$set(val,"checked",_this.checkedall);
					}else{
						_this.$set(val,"checked",_this.checkedall);
					}
			})
			this.caleTotalPrice()
		},
		//加减调动totalMoney
		PriceReduction:function(){
			this.caleTotalPrice();
		},
		//计算Item total
		caleTotalPrice:function(item){
			var _this = this;
			this.totalMoney = 0;
			this.data.forEach(function(item,index){
					if(item.checked){
						_this.totalMoney += item.productPrice * item.productQuantity
					}
			})
		},
		//获取当前点击元素，响应赋值下标
		delConfirm:function(item){
			this.curProduct = item;
		},
		//删除功能
		delProduct:function(){
			var index = this.data.indexOf(this.curProduct);
			this.data.splice(index,1);
			this.delFlag = false;
			this.caleTotalPrice();
			var _this = this;
			this.data.some(function(val,index){
					if(val.checked == true){
						_this.checkedall = true;
					}else{
						_this.checkedall = false;
						return true;
					}
				})
		},
		//跳转
		url:function(){
			if(this.totalMoney != 0){
				return 'address.html';
			}
		}
	}	
})
