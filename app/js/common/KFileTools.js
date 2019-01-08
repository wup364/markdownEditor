"use strict";
/**
 * KFileTools.js
 * 
 * isFileSync						[ U ]
 * isDirSync						[ U ]
 * getFileListSync 					[ T ]
 * getFileSizeSync 					[ T ]
 * getFileMd5Async 					[ T ]
 * getFileStreamSync				[ T ]
 * getFileStreamAsync				[   ]
 * getSavePathSync					[ T ]
 * getProjectDirSync				[ T ]
 * getInstallDirSync				[ T ]
 * getAppDataDirSync				[ U ]
 * getAppExcuteDirSync				[ U ]
 * getFilePathInProject				[ T ]
 * getFilePathInInstall				[ T ]
 * getDirArraySync					[ T ]
 * getDirArrayByArraySync			[ T ]
 * setJsonConfig					[ U ]
 * getJsonConfig					[ U ]
 * mkDirsSync						[ T ]
 * renameSync   					[ T ]
 * moveFileSync 					[ T ]
 * removeFilesByPathSync 			[ T ]
 * writeFileSync					[ T ]
 * writeFileAsync					[   ]
 * readFileSync						[ T ]
 * readFileAsync					[   ]
 * appendFileAsync					[   ]
 * appendFileSync					[ T ]
 * end By wupeng364@outlook.com
 **/



// 本地文件操作类
;(function(factory) {
    "use strict";
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory( );
    }
	else
	{ 
        window.KFileTools = factory();
	}
    
}(function ( args ){
	"use strict";
	require("./StringPrototype.js");						// 原型拓展
	const fileSys	=  require("fs");                   	// 文件系统
	const crypto	=  require("crypto");					// 加密模块
	
	const OB_Result = {

	};

	// 是否时文件
	OB_Result.isFileSync = function( filePath ){
    	if( fileSys.existsSync( filePath ) ){
    		return fileSys.statSync( filePath.parsePath( ) ).isFile( );
    	}
    	return false;
    };

    // 是否时文件夹
    OB_Result.isDirSync = function( dirPath ){
    	try{
	    	dirPath = dirPath.parsePath( );
	    	if( fileSys.existsSync( dirPath ) ){
	    		return fileSys.statSync( dirPath ).isDirectory( );
	    	}
    	}catch( e ){  }
    	return false;
    };

    //创建多层文件夹
	OB_Result.mkDirsSync = function( dirpath, mode ) { 
		dirpath = dirpath.parsePath( true );
		try{
			if( !fileSys.existsSync( dirpath ) ) {
		    	let paths = dirpath.split( "/" );
		    	let tempPath ="";
		    	for (let i = 0; i < paths.length; i++) {
		    		if( i ==0 ){
		    			tempPath = paths[i] +"/";
		    		}else{
		    			tempPath = tempPath.getPath( ) +"/"+ paths[ i ];
		    		}
		    		if( fileSys.existsSync( tempPath.parsePath(  ) ) ){
		    			let states = fileSys.statSync( tempPath ); 
		    			if( states.isFile( ) ){
		            		fileSys.mkdirSync( OB_Result.parsePath( tempPath ), mode );
		    			}
		            }else{ 
		            	fileSys.mkdirSync( OB_Result.parsePath( tempPath ), mode );
		            }
		    	} 
		    }
		}catch( e ){
			return false;
		}
	    return true;
	};

	// 覆盖写入文本文件
	OB_Result.writeFileSync = function( savePath, text, option ){
		try{
			savePath = savePath.parsePath(  );
			if( !fileSys.existsSync( savePath ) ){
				OB_Result.mkDirsSync( savePath.getParent( ) );
			}
			fileSys.writeFileSync( savePath, text, option ); 
		}catch( e ){ return false; }
		return true;
	};

	// 覆盖写入文本文件
	OB_Result.writeFileAsync = function( savePath, text, option, callback ){
		savePath = savePath.parsePath(  );
		if( !fileSys.existsSync( savePath ) ){
			OB_Result.mkDirsSync( savePath.getParent( ) );
		}
		fileSys.writeFile( savePath, text, option, callback ); 
	};
	
	// 追加写入文本文件
	OB_Result.appendFileAsync = function( savePath, text, option, callback ){
		savePath = savePath.parsePath(  );
		if( !fileSys.existsSync( savePath ) ){
			OB_Result.mkDirsSync( savePath.getParent( ) );
		}
		fileSys.appendFile( savePath, text, option, callback ); 
	};

	// 追加写入文本文件
	OB_Result.appendFileSync = function( savePath, text, option ){
		try{
			savePath = savePath.parsePath(  );
			if( !fileSys.existsSync( savePath ) ){
				OB_Result.mkDirsSync( savePath.getParent( ) );
			}
			fileSys.appendFileSync( savePath, text, option ); 
		}catch( e ){ return false; }
		return true;
	};

	// 读取文本文件
	OB_Result.readFileSync = function( readPath, option ){
		readPath = savePath.parsePath(  );
		if( fileSys.existsSync( readPath ) ){
			return fileSys.readFileSync( readPath, option );
		}else{
			return "";
		}
	};

	// 读取文本文件
	OB_Result.readFileAsync = function( readPath, option, callback ){
		fileSys.readFile( readPath.parsePath( ), option, callback );
	};

	return OB_Result;
}));