utils = {
    setParam : function (name,value){
        localStorage.setItem(name,value)
    },
    getParam : function(name){
        return localStorage.getItem(name)
    }
}
product={
    id:0,
    name:"",
    ProModel:"",
    pic:"",
    num:0,
    price:0.0,
};
orderdetail={
    username:"",
    phone:"",
    address:"",
    zipcode:"",
    totalNumber:0,
    totalAmount:0.0
}
cart = {
    //向购物车中添加商品
    addProduct:function(product){
        var ShoppingCart = utils.getParam("ShoppingCart");
        console.log(ShoppingCart);
        if(ShoppingCart==null||ShoppingCart==""){
            //第一次加入商品
            var jsonstr = {"productlist":[{"id":product.id,"name":product.name,"num":product.num,"price":product.price,"ProModel":product.ProModel,"pic":product.pic}],"totalNumber":product.num,"totalAmount":(product.price*product.num)};
            utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
           
        }else{
        	    
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
            var productlist = jsonstr.productlist;
            var result=false;
            //查找购物车中是否有该商品
            for(var i in productlist){
                if(productlist[i].id==product.id){
                    productlist[i].num=parseInt(productlist[i].num)+parseInt(product.num);
                    result = true;
                }
            }
            if(!result){   //没有该商品就直接加进去
                productlist.push({"id":product.id,"name":product.name,"num":product.num,"price":product.price,"ProModel":product.ProModel,"pic":product.pic});
            }
            //重新计算总价
             console.log(jsonstr.productlist)
              console.log(product.num)
              
              var _totalNumber=parseInt(jsonstr.totalNumber);
              if(isNaN(_totalNumber)){
              	_totalNumber=0;
              }
           var _totalAmount=Number(jsonstr.totalAmount);
            if(isNaN(_totalAmount)){
              	_totalAmount=0;
              }
            
            
            jsonstr.totalNumber=_totalNumber+parseInt(product.num);
            
            jsonstr.totalAmount=parseFloat(_totalAmount)+(parseInt(product.num)*parseFloat(product.price));
             
            
            orderdetail.totalNumber = jsonstr.totalNumber;
            orderdetail.totalAmount = jsonstr.totalAmount;
            //保存购物车
            utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
        }
    },
    //修改给买商品数量
    updateProductNum:function(id,num){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        for(var i in productlist){
            if(productlist[i].id==id){
                jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+(parseInt(num)-parseInt(productlist[i].num));
                jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+((parseInt(num)*parseFloat(productlist[i].price))-parseInt(productlist[i].num)*parseFloat(productlist[i].price));
                productlist[i].num=parseInt(num);
                orderdetail.totalNumber = jsonstr.totalNumber;
                orderdetail.totalAmount = jsonstr.totalAmount;
                utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
                return;
            }
        }
    },
    //获取购物车中的所有商品
    getProductList:function(){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        orderdetail.totalNumber = jsonstr.totalNumber;
        orderdetail.totalAmount = jsonstr.totalAmount;
        return productlist;
    },
  
   //不传id则判断购物车中是否存在商品，传id则判断购物车中是否存在某种商品
    existProduct:function(id){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        var result=false;
        if(id!=null){
            for(var i in productlist){
                if(productlist[i].id==id){
                    result = true;
                }
            }
        }else{
            if(productlist.length>0){
                result=true;
            }
        }
        return result;
    },
    //不传id则删除购物车中所有商品，传id则删除某种商品
    clearProduct:function(id){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        var list=[];
        if(id!=null){
            for(var i in productlist){
                if(productlist[i].id==id){
                    jsonstr.totalNumber=parseInt(jsonstr.totalNumber)-parseInt(productlist[i].num);
                    jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)-parseInt(productlist[i].num)*parseFloat(productlist[i].price);
                }else{
                    list.push(productlist[i]);
                }
            }
        }
        else
        {jsonstr.totalNumber=0;
        	jsonstr.totalAmount=0;
        }
        
        jsonstr.productlist = list;
        orderdetail.totalNumber = jsonstr.totalNumber;
        orderdetail.totalAmount = jsonstr.totalAmount;
        utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
    }
};