new Vue({
	el:".address",
	data:{
		data : [],
		limitNum : 3,
		currentIndex:0,
		shippingMethod:1,
		delFlag:false,
		editFlag:false
	},
	//生命周期函数
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		})
	},
	//计算
	computed:{
		filteraddres:function(){
			return this.data.slice(0,this.limitNum)
		}
	},
	//调用方法
	methods:{
		//获取数据，以数组形式接收
		getAddressList:function(){
			let _this = this;
			this.$http.get("data/address.json").then(function(res){
				console.log(res.data.result);
				_this.data = res.data.result;
			})
		},
		//显示数据数量
		loadMore:function(){
			if(this.limitNum!=this.data.length){
				this.limitNum = this.data.length;
			}else{
				this.limitNum = 3;
			}
		},
		// 删除 获取当前元素，响应赋值下标进行操作
		delConfirm:function(item){
			this.curProduct = item;
		},
		//删除功能
		delProduct:function(){
			let index = this.data.indexOf(this.curProduct);
			this.data.splice(index,1);
			this.delFlag = false;
		},
		// 编辑 获取当前元素，响应赋值下标进行操作
		editAddress:function(item){
			this.editBox = item;
			this.editBoxT = 'null';	
		},	
		//编辑功能
		Preservation:function(){
			userName = document.getElementsByClassName("md-input__inner")[0].value;
			streetName = document.getElementsByClassName("md-input__inner")[1].value;
			tel = document.getElementsByClassName("md-input__inner")[2].value;
			if(this.editBoxT!='undefined'){
				if(this.editBox.streetName!='undefined'){
					if(userName!=''&&streetName!=''&&tel!=''){
					console.log(this.editBox);
				let index = this.data.indexOf(this.editBox);
			this.data[index].userName = userName;
			this.data[index].streetName = streetName;
			this.data[index].tel = tel;
			this.editFlag = false;
			}else{
				alert("请您填写正确信息!")
			}
				}
				
			}else{
				this.increaseAddress();
				this.editFlag=false;
			}
		},
		//添加功能
		increaseAddress:function(){
			this.editBoxT = 'undefined';
			var ProductList = document.getElementById('ProductList');
			if(this.editFlag == true){
			this.data.unshift({
				userName : userName,
				streetName : streetName,
				tel : tel
			});
			}
			this.editFlag=true;
		}
	}
})