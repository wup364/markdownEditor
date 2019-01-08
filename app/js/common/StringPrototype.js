"use strict";
/**
 * StringPrototype.js
 *
 * 原型拓展类
 * 
 * end By wupeng364@outlook.com
**/
if ( !global.___Required__StringPrototype__ ) {

	// 路径处理去掉最后一个 / 避免 [ /admin/ ]出现
	String.prototype.getPath = function( ){
		let temp=this.toString( );
		if( this!=null && this!="" ){	
			let lstIndex = this.lastIndexOf("/"); 
			if( lstIndex == this.length-1 ){ 
				temp = this.substring(0,this.lastIndexOf("/"));
			}
		}
		return temp;
	};

	// 路径转换
	String.prototype.parsePath = function( op ){
		let temp_path = this.toString( );
		if(  op == true ){
			while( temp_path.indexOf("\\") != -1 ){
				temp_path = temp_path.toString( ).replace("\\","/");
			}
			return temp_path.getPath( );
		}
		temp_path = temp_path.getPath( );
		let temp = "";
		while( temp_path.length > 0 ){
			temp += temp_path.substring( 0, temp_path.indexOf("/")+1 ).replace( "/","\\" );
			if( temp_path.indexOf( "/" ) != -1 ){
				temp_path = temp_path.substr( temp_path.indexOf( "/" )+ 1 );
			}else{
				temp += temp_path;
				temp_path = "";
			}  
		}
		return temp.getPath( );
	};

	// 替换字符
	String.prototype.replaceStr = function( splitStr, replaceStr ){

		let strs= new Array( ); 
		strs=this.split( splitStr.toString( ) ); 
		let temp = ""; 
		for (let i=0;i<strs.length ;i++ ){ 
			temp += strs[i];
			if( i != strs.length-1 && replaceStr ){
				temp +=replaceStr;
			} 
		} 
		return temp + "";
	};

	// 获取绝对路径
	String.prototype.getAbsolutePath = function( basePath ){
		try{
		  let js_dir = basePath.parsePath( true ).getPath( );
		  let relative_path_arry = this.toString( ).split("/");
		  let upLevelCout = 0;
		  let relative_path_splite = "";
		  for( let i = 0; i<relative_path_arry.length; i++ ) {
		    if( relative_path_arry[i] != ".." && relative_path_arry[i] != "." ){
		        relative_path_splite+="/"+relative_path_arry[i];
		    }else if( relative_path_arry[i] == ".." ){ 
		      upLevelCout++; 
		    }
		  }
		  for( let i=0; i<upLevelCout;i++ ){
		    js_dir = js_dir.getParent( );
		  }
		  js_dir += relative_path_splite;
		  return js_dir.parsePath( true );
		}catch(e){ 
			return basePath;
		}
	};
	// 得到名字
	String.prototype.getName = function( B_GetSuffixed ){
		let temp = this.toString( ).parsePath( true );
		temp = temp.substring( temp.lastIndexOf("/")+1 );
		if( B_GetSuffixed == false && temp.lastIndexOf(".") != -1 ){
		 	temp = temp.substring( 0,temp.lastIndexOf(".") );	
		}
		return temp;
	};
	// 得到后缀 
	String.prototype.getSuffixed = function( B_HavePoint ){
		let temp = this.toString( ).getName( );
		if( temp.lastIndexOf(".") == -1 ){
			return "";
		}
		let subIndex = temp.lastIndexOf(".");
		if( B_HavePoint == false ){
			subIndex++;
		}
		temp = temp.substring( subIndex );
		return temp;
	}

	// 得到父级路径 
	String.prototype.getParent = function( ){
		let temp = this.getPath(  ); 
		if( temp.indexOf("/") > -1 ){
			temp = temp.substring(0,temp.lastIndexOf("/"));
			temp = (temp == ""?"/":temp);
		}else{
			temp = temp.substring(0,temp.lastIndexOf("\\"));
			temp = (temp == ""?"\\":temp);
		}
		return temp;
	};

	// 转换成系统路径
	String.prototype.getPathForKass = function( parentPath ){ 
		let temp = this.getPath( );
		if( parentPath!=null && parentPath.length > 0 ){
			parentPath = parentPath.getPath( ); 
		 	temp = temp.substring( parentPath.length ); 
		}
		return temp;
	};

	// 是否以XXX开始
	String.prototype.startWith = function(str){  
	    if(str==null||str==""||this.length==0||str.length>this.length)  
	      return false;  
	    if(this.substr(0,str.length)==str)  
	      return true;  
	    else  
	      return false;  
	    return true;  
	};
	// 是否以XXX结束
	String.prototype.endWith = function(str){  
	    if(str==null||str==""||this.length==0||str.length>this.length)  
	      return false;  
	    if(this.substring(this.length-str.length)==str)  
	      return true;  
	    else  
	      return false;  
	    return true;  
	} 
	// 获取ip地址端口
	String.prototype.getPort =function(  ) {
	  let lastIndex1 = this.lastIndexOf(":");
	  let lastIndex2 = this.lastIndexOf("/");
	  if ( lastIndex2 < lastIndex1 ) {
	      if( lastIndex1 >0 && lastIndex1 < this.length && lastIndex1 > 3 && lastIndex2 > 5 ){
	          return this.substring(lastIndex1+1);
	      }
	  }
	   return null;
	}
	// 获取完整ip地址格式
	String.prototype.getServer=function( ){
	    let lastIndex1 = this.length;
	    let lastIndex2 = 0;
	    let lastIndex3 = this.lastIndexOf("http://");
	    if( lastIndex3 >= 0 ){
	      lastIndex2 = 7;
	    }
	    if( this.lastIndexOf(":") > 5 ){
	          lastIndex1 = this.lastIndexOf(":");
	    }

	    return this.substring(lastIndex2,lastIndex1);
	}
	// 获取文字MD5
	String.prototype.getMd5 = function( isUpperCase ){
		let strTemp = KRequire.crypto.createHash("md5").update( this.toString( ) ).digest("hex");
		if( isUpperCase == false ){
			return strTemp.toLowerCase( );
		}
		return strTemp.toUpperCase( );
	};
	// 获取文字Base64
	String.prototype.toBase64Str = function( ){
		return new Buffer( this.toString( ) ).toString('base64');
	};
	// 解码文字Base64
	String.prototype.getStrForBase64 = function( ){
		return new Buffer( this.toString( ), 'base64').toString( );
	};

	global.___Required__StringPrototype__ = true;
};