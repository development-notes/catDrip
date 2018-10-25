/*!
 * 공통 사용 함수 정리
 * 2018.09.14 조재훈
 */

// 확장자명 관리
var DOCUMENTFILE_EXT = ['txt', 'doc', 'docx', 'hwp', 'pdf', 'ppt', 'pptx', 'xls', 'xlsm', 'xlsx'];
	
/*
 * ================= jqGrid 공통 함수 =================
*/

// 표를 그린다.
function drawJqGrid(obj){
	$('#'+obj.listTagId).jqGrid( {
		datatype: "local",
		mtype : 'POST',
		postData : fn_getFormData('#'+obj.formTagId),
		colNames : obj.colName,
		colModel : obj.colModel,
		gridview : true,
		toolbar : [ false, "bottom" ],
		viewrecords : false,
		//shrinkToFit : false,
		autowidth : true,
		height : obj.objectHeight,
		pager : $('#'+obj.pagerTagId),
		multiselect: obj.checkboxStatus,
		//beforeSaveCell : chmResultEditEnd,
		loadtext : '데이터를 처리중 입니다.', 
		imgpath : 'themes/catDrip/images',
		onPaging : function(pgButton) {
			/*this is to fix the issue when we go to last page(say there are only 3 records and page size is 5) and click 
			 * on sorting the grid fetches previously loaded data (may be from its buffer) and displays 5 records  
			 * where in i am expecting only 3 records to be sorted out.along with this there should be a modification in source code.
			 */
			$(this).jqGrid( "clearGridData" );

			/* this is to make the grid to fetch data from server on page click*/
			$(this).setGridParam( { datatype : 'json', postData : { pageYn : 'Y' } } ).triggerHandler( "reloadGrid" );
		}
	} );
}
	
//data load
function loadingData(obj){
	$('#'+ obj.listTagId).jqGrid('clearGridData');
	$('#'+ obj.listTagId).jqGrid('setGridParam', {
		mtype : 'POST',
		url : '/pcm/'+obj.url,
		datatype : 'json',
		page : 1, // 로드시 현재 페이지번호
		postData : fn_getFormData('#'+obj.formTagId),
		rowList : [ 10, 50, 100 ],
		rowNum : obj.rowNum,
		onCellSelect : obj.onCellSelect,	// cell click event
		beforeSelectRow: obj.beforeSelRow,  // grid 실행전
		loadComplete : obj.loadComplete,	// grid 실행후 event
		onSelectAll : obj.onSelectAll, 		// header checkbox event
		loadonce: false,
		multiboxonly: true,
		jsonReader : {
			root : "rows",
			page : "page",
			total : "total",
			records : "records",
			repeatitems : false,
		}
	}).trigger("reloadGrid");
}

//jqGrid checkbox formatter
function formatter_checkbox(c, o, r){
	let name = o['colModel']['name'];
	let check = '';
	
	if('Y' == c){
		check = 'checked="checked"';
	}
	
	let str = '<input type="checkbox" name="'+ name +'" value="Y" '+ check +'>';
	
	return str;
}


//파일명 -> 확장자 명 -> 확장자 이미지 교체
function changeExtImg(c, o, r){
	c = DOCUMENTFILE_EXT.indexOf(c) == -1 ? 'etc' : c;

	return '<div class="img-box"><i class="ico_'+c+'"> </i></div>';
}

/*
 * ================= End... jqGrid 공통 함수 =================
*/


/*
 * ================= 편의성 함수 =================
*/

//새로고침할때마다 배경 높이를 조절한다.
function backgroundHeight(obj, h){
	var sheight = null;
	var cheight = null; 
	
	if (navigator.userAgent.indexOf("MSIE 5.5")!=-1) {
		sheight = document.body.scrollHeight;
		cheight = document.body.clientHeight;
	} else {
		sheight = document.documentElement.scrollHeight;
		cheight = document.documentElement.clientHeight;
	}
	
	var positionTop = $(obj).position().top;
	var objectHeight = (sheight - positionTop - h);
	console.log(obj + ' : ' + objectHeight);
	$(obj).css('height', objectHeight);
}

function gridObjectHeight(obj){
	var sheight = null;
	var cheight = null; 
	
	if (navigator.userAgent.indexOf("MSIE 5.5")!=-1) {
		sheight = document.body.scrollHeight;
		cheight = document.body.clientHeight;
	} else {
		sheight = document.documentElement.scrollHeight;
		cheight = document.documentElement.clientHeight;
	}
	
	var positionTop = $('.'+obj.areaClassName).position().top;
	var objectHeight = (sheight - positionTop - obj.value1 - (obj.value2 * obj.headerSize)) / obj.value3;

	return objectHeight;
}

//폼데이터를 Json Arry로 직렬화
function fn_getFormData(form) {
    var unindexed_array = $(form).serializeArray();
    var indexed_array = {};
	
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
};

/**
 * input 검색조건 upper 처리
 * */
function fn_all_text_upper() {
	$("input[type=text]").change( function() {
		$(this).val( $(this).val().toUpperCase() );
	});
}

//afterSaveCell oper 값 지정
function chmResultEditEnd(irowId, cellName, value, irow, iCol) {
	var item = $('#docRevisionList').jqGrid('getRowData', irowId);
	
	if(item.oper != 'I'){
		item.oper = 'U';
		$('#docRevisionList').jqGrid('setCell', irowId, cellName, '', {'background' : '#6DFF6D'});
	}
		
	
	$('#docRevisionList').jqGrid("setRowData", irowId, item);
	$("input.editable,select.editable", this ).attr("editable", "0");
}

function fn_gridresize(winObj, gridId, localAddHegiht, rate){
	winObj.bind('resize', function() {
		if(localAddHegiht == null){
			localAddHegiht = 0;
		}
		if(rate == null){
			rate = 1;
		}
		var gridWidth = winObj.width()*0.98-2;
		var gridHeight = winObj.height()*rate -220-localAddHegiht;
		
		gridId.setGridWidth(gridWidth);
		gridId.setGridHeight(gridHeight);
	}).trigger('resize');
}

function isEmpty(value){ 
	if( value == "" || value == null || value == undefined || 
		( value != null && typeof value == "object" && !Object.keys(value).length )){ 
		return true 
	}else{ 
		return false 
	} 
}



/*
 * ================= 편의성 함수 ================= 
*/