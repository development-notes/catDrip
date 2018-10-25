/*
	+------------------------------------------------------------------------+
	| fileUpload.js                                                		 	 |
	+------------------------------------------------------------------------+
*/
var APPEND_FILE_BANK = new Array();
var FORM_LINE_TEMP = new Array();

//첨부순서
var FILE_SEQ_AREA = '<div class="ctrl_btn" style="float:right; margin-right:15px;"><button type=\"button\" title=\"위로\" class=\"btn_up\"></button><button type=\"button\"  class=\"btn_down\" disabled=\"true\"></button></div>';

//file reDesign...
function fileChkboxCreate (fname, whichAction) {	
	var _data = null;
	var fileAppend= "";
	var _obj = null;
	var isAll = false;
	
	for(var i=0; i < APPEND_FILE_BANK.length; i++){

		if(fname != null){

			if(APPEND_FILE_BANK[i].fname == fname){
				_data =  APPEND_FILE_BANK[i].data;
				_obj =  APPEND_FILE_BANK[i].obj;

			}else{
				_data = null;
			}

		}else{

			_data =  APPEND_FILE_BANK[i].data;
			_obj =  APPEND_FILE_BANK[i].obj;
		}

		if(_data){				
			if(_data.indexOf('|0|') > -1)  isAll = true;			
			
			if (whichAction == null || whichAction == 'editor') {
				fileAppend = '<input name="appfile0" type="checkbox" value="0" class="input_chk" '+((isAll)? 'checked': '')+'><span class="guide_txt mgr">: 전체&nbsp&nbsp</span>';
				for(var j=0; j < FORM_LINE_TEMP.length; j++){
					fileAppend += '<input name="appfile'+(parseInt(j)+1)+'" type="checkbox" value="'+FORM_LINE_TEMP[j].idx+'" class="input_chk" '+((isAll || (_data.indexOf('|'+FORM_LINE_TEMP[j].idx+'|') > -1))? 'checked': '')+' '+((isAll)? 'disabled="true"': '')+'><span class="guide_txt mgr">: '+(parseInt(j)+1)+'안&nbsp&nbsp</span>';
				}
				
				_obj.find('.size-fr').html(fileAppend);
			}

		}

	}
};

!function ($) {

	"use strict"; 

	//No Transport event...
	$.support.cors = true;

	if($.fn.ajaxForm == undefined) {

		/*var href = $(location).attr('href');
		var cutPos = href.lastIndexOf("/");
		var cut = href.substring(0, cutPos);
		cutPos = cut.lastIndexOf("/");
		var url = cut.substring(0, cutPos + 1) + "js/jquery.form.js";	
		alert(url);
		document.write('<script type="text/javascript" src="' + url + '" charset="utf-8"></script>');
		$.getScript(url);*/
	}

	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;


	/* HGW FileUpload CONTROL PUBLIC CLASS DEFINITION
	 * =============================== */

	var HGW_FileUpload = function (element, options) {
		if ($.fn.ajaxForm)  this.init(options.id, element, options);
	};

	var isFileTypeAllowed = function (_allowedTypes,fileName) {		
		var fileExtensions = _allowedTypes.toLowerCase().split(","); 
		var ext = fileName.split('.').pop().toLowerCase(); 
		if(_allowedTypes != "*" && jQuery.inArray(ext, fileExtensions) < 0)  return true;
		return true;
	};    

	var formatFileSize = function (bytes) {
		if (typeof bytes !== 'number') return '';
		if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
		if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB';
		return (bytes / 1024).toFixed(2) + ' KB';
	};

	var fileDupliChk = function (fileGroup, fileName) {
		for(var i=0; i < fileGroup.length; i++) if(fileGroup[i] == fileName) return true;
		return false;
	};


	var uploadCancle = function (fileGroup, fileName) {
		for(var i=0; i < fileGroup.length; i++) if(fileGroup[i] == fileName) fileGroup.splice(i,1);
	};

	var serializeData = function (extraData) {
		var serialized = [];
		if(jQuery.type(extraData) == "string") {
			serialized = extraData.split('&');
		} else {
			serialized = $.param(extraData).split('&');
		}
		var len = serialized.length;
		var result = [];
		var i, part;
		for(i = 0; i < len; i++) {
			serialized[i] = serialized[i].replace(/\+/g, ' ');
			part = serialized[i].split('=');
			result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
		}
		return result;
	}


	var fileBankDel = function (fname) {	
		for(var i=0; i < APPEND_FILE_BANK.length; i++){
			if(APPEND_FILE_BANK[i].fname == fname){
				APPEND_FILE_BANK.splice(i,1);
				$('#fileLength').text(APPEND_FILE_BANK.length);
			}
		}
	};
	
	// 첨부순서
	var fileBankSeq = function(objId) {
		var _FILE_ARRAY = new Array();
		$('#flist_'+objId).find('li').each(function(seq) {
			var thisId = $(this).attr('id');
			
			for (var i=0; i<APPEND_FILE_BANK.length; i++) {
				if (thisId == APPEND_FILE_BANK[i].fname) {
					_FILE_ARRAY.push(APPEND_FILE_BANK[i]);
				}
			}
		});
		
		APPEND_FILE_BANK = _FILE_ARRAY.slice(0);
	};
	
	var onLoadFileDel = function (fileGroup, fileName) {
		for(var i=0; i < fileGroup.length; i++) if(fileGroup[i] == fileName) fileGroup.splice(i,1);
	};


	//{name:"Xsystem_nameX1.jpg",realname:"file1.jpg",realpath:"http://harami.co.kr/file/upload",size:"2115",data:"|1|"
	var fileBankAppend = function (_fname,_data,_obj,_name,_realname,_realpath,_size, _ext, _webpath) {	
		try{
			APPEND_FILE_BANK.push({fname:_fname,data:_data,obj:_obj,name:_name,realname:_realname,realpath:_realpath,size:_size,ext:_ext,webpath:_webpath});
			$('#fileLength').text(APPEND_FILE_BANK.length);
		}catch(e){}
	};    


	var fileBankDataUpdate = function (fname,_data) {	

		for(var i=0; i < APPEND_FILE_BANK.length; i++){
			//alert(APPEND_FILE_BANK[i].fname);
			if(APPEND_FILE_BANK[i].fname == fname) APPEND_FILE_BANK[i].data = _data;
		}

	};    
 

	var chkBoxChange = function(_obj){
		var all = _obj.val();
		var _newData = "|";
		var _objId = _obj.parent().parent().attr("id");

		if(_obj.is(":checked")){	
			_obj.parent().children("input[name ^= 'appfile']").each(function(){
				if(all == '0'){
					this.checked = true;
					if($(this).val() != '0') this.disabled = true;
				}

				if($(this).is(":checked")) _newData += $(this).val() + "|";

			});

			if(_newData.indexOf("|0|") > -1) _newData = "|0|";
				
			if(_objId) fileBankDataUpdate(_objId,_newData); 

		}else{
			_obj.parent().children("input[name ^= 'appfile']").each(function(){		
				if(all == '0'){
					this.disabled = false;
					if(_obj.val() != '0') this.checked = true;
				}
				if($(this).is(":checked")) _newData += $(this).val() + "|";
			});

			if(_newData.length < 3){
				alert("등록된 파일은 최소 하나 이상의 문서에 첨부 되어야 합니다.");
			}
			if(_objId) fileBankDataUpdate(_objId,_newData); 
		}
	};




	 /* HGW FileUpload PROTOTYPE CLASS DEFINITION
	  * =============================== */
	HGW_FileUpload.prototype = {
	    constructor: HGW_FileUpload,
			
	    init: function (objId, element, options) {
	    	this.objId = objId;
	    	this.options = this.setOptions(options);
	    	this.$element = $(element);
	    	this.create();
			this.$element.on("change","input[name ^= 'appfile']",function(){
				chkBoxChange($(this));
			});
		},
		
		setOptions: function (options) {
			options = $.extend({},$.fn['fileUpload'].defaults,options);
			
			return options
	    },			
			
		create: function () {
			var formGroup = 'form_bar'+this.objId;
			var OBJID = this.objId;
	
			this.$element.html( 
				'	<div class="fileupload" id="'+this.objId+'">' + 
				'		<div class="file_bar">' + 
				'			<div class="fl">' + 
				'				<div class="btn_bar">' +
				'					<span class="btn filebtn"><span> 파일 첨부 </span><span id="'+formGroup+'"></span></span>' +
				'				</div>' +
				'				<div class="info_bar">' +
				'					<span class="file_upload_info">' +
				'						<span style="color: red;">' +
				'							<samp id="fileLength">0</samp>' +
				'						개</span>'+
				'						<span> / 10개</span>' +
				'					</span>' +
				'				</div>' +
				'			</div>' +
				'			<div class="fr">' +
				'				<div class="ajax-upload-dragdrop">' +
				'					<i class="ico ico_drag"></i><span>첨부하실 파일을 마우스로 드래그하여 추가할 수 있습니다.</span>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +											
				'		<div class="attach_files">' +	
				'			<div class="file">' +
				'				<ul id="flist_'+this.objId+'">' +
				'				</ul>' +
				'			</div>' +
				'		</div>' +
				'	</div>'
			); 
	
			var whichAction = this.options.whichAction;
			var defFile = this.options.defaultFile;
			var _fname= "";
			
			if (defFile.length > 0) {
				for(var i=0; i <defFile.length;i++){
					_fname = 'fname_'+(new Date().getTime()+parseInt(i));
					var attaId = defFile[i].attaId == undefined ? '' : defFile[i].attaId;
					var attaSeq = defFile[i].attaSeq == undefined ? '' : parseInt(defFile[i].attaSeq);
					
					var fileProcess = $(
						'  <li id="'+_fname+'"><div class="size-fl">'+ 
						'			<button type="button" title="삭제" class="ico ico_del" fname="'+_fname+'"></button><a href="#" class="attaClickArea" attaId="'+attaId+'" attaSeq="'+attaSeq+'" realpath="'+defFile[i].realpath+"/"+defFile[i].name+'">'+defFile[i].realname+'</a> <span class="size"></span>'	+
						'		</div>'+ 
						'		<div class="size-fr">'+ 
						'		</div>'+ 
						(true == this.options.fileSeqHandler ? FILE_SEQ_AREA : '')+ 
						'</li>'
					); 
	
					// 첨부순서
					if (true == this.options.fileSeqHandler) {
						$('#flist_'+this.objId+'>li:last').find(".btn_down").removeAttr("disabled");
						$('#flist_'+this.objId).append(fileProcess);
						if( $('#flist_'+this.objId+'>li:last').prev().html() == null ) $('#flist_'+this.objId+'>li:last').find(".btn_up").attr("disabled","true");
					} else {
						$('#flist_'+this.objId).append(fileProcess);
					}
	
					//eins : Array Setting...
					//{name:"Xsystem_nameX1.jpg",realname:"file1.jpg",realpath:"http://harami.co.kr/file/upload",size:"2115",data:"|1|"
					fileBankAppend(_fname,defFile[i].data,fileProcess,defFile[i].name,defFile[i].realname,defFile[i].realpath,defFile[i].size,defFile[i].ext,defFile[i].webpath);
					//Default file checkbox create...
					fileChkboxCreate(_fname,whichAction);
				}
	
				//data delete...
				$('#flist_'+this.objId+' .ico_del').click(function(){
					
					var delname = $(this).attr('fname');
	
					fileBankDel(delname);
					$('#'+delname).remove();
	
					$('#flist_'+OBJID+' li:first').find(".btn_up").attr("disabled","true");
					$('#flist_'+OBJID+' li:last').find(".btn_down").attr("disabled","true");
				});
			}
	
	        if(!feature.formdata) this.options.dragDrop = false; 
	        if(!feature.formdata) this.options.multiple = false; 
	    
			if(this.options.dragDrop){
	
				//this.setDragDropHandlers(this.$element.find('.'+this.options.dragDropContainerClass),this.options,this.serializeAndUploadFiles,this.ajaxFormSubmit); 
				this.setDragDropHandlers(this.$element.find('.'+this.options.dragDropContainerClass)); 
	
			}else{
				this.$element.find('.'+this.options.dragDropContainerClass).hide();
			}				
	
			this.createCutomInputFile(formGroup,this.options,this.createCutomInputFile,this.ajaxFormSubmit,this.serializeAndUploadFiles); 
	
			// 첨부순서 이벤트 바인딩
			if (true == this.options.fileSeqHandler) {
				$('#flist_'+OBJID).on('click','.btn_up',function() {
					//Color Fixed...
					colorObj = $(this);
					colorObj.parent().parent().find('.attaClickArea').css('color', 'rgb(168,68,68)');
					moveUp($(this).parent().parent());
					
					fileBankSeq(OBJID);
					setTimeout( function(){colorObj.parent().parent().find('.attaClickArea').css('color', 'rgb(68,68,68)');},1000 );
				});
				
				$('#flist_'+OBJID).on('click','.btn_down',function() {
					//Color Fixed...
					colorObj = $(this);
					colorObj.parent().parent().find('.attaClickArea').css('color', 'rgb(168,68,68)');
					moveDown($(this).parent().parent());
	
					fileBankSeq(OBJID);
					setTimeout( function(){colorObj.parent().parent().find('.attaClickArea').css('color', 'rgb(68,68,68)');},1000 );
				});
			}
		},
			
		
		updateFileCounter: function () {	
			//alert("파일 카운트"+$('#totalCount_'+this.objId).html());
	     },
	        
		createCutomInputFile: function (formGroup,_options,_createCutomInputFile,_ajaxFormSubmit,_serializeAndUploadFiles) {		
			var fileUploadId = "fileUpload_" + (new Date().getTime()); 
			var form = $("<form method='" + _options.method + "' action='" + _options.url + "' enctype='" + _options.enctype + "'></form>"); 
			var fileInputStr = "<input type='file' id='" + fileUploadId + "'  class='fileinp' name='" + _options.fileName + "' accept='" + _options.allowedTypes + "'/>"; 
	
			if(_options.multiple) {
				if(_options.fileName.indexOf("[]") !=_options.fileName.length - 2)
				{
					_options.fileName += "[]";
				}
				fileInputStr = "<input type='file' id='" + fileUploadId + "'  class='fileinp' name='" + _options.fileName + "' accept='" + _options.allowedTypes + "' multiple/>";
			}
			
			var fileInput = $(fileInputStr).appendTo(form); 
			$('#'+formGroup).append(form); 
	
			//file change Check...
			fileInput.on('change', function (e) {
				var fileArray = [];
					
				if(this.files && feature.fileapi && feature.formdata) {            
					//devide a files object...
					_serializeAndUploadFiles(_options,this.files,_ajaxFormSubmit); 
				}else{//explorer 10 under..
					var filenameStr = $(this).val(); 
					var org_filenameStr = filenameStr;
					var _fname = "";
						filenameStr = filenameStr.substring(filenameStr.lastIndexOf("\\")+1,filenameStr.length);
						_fname = 'fname_'+(new Date().getTime()+parseInt(1));
	
					if(fileDupliChk(_options.onLoadFileName, filenameStr)){
						
						$('#flist_'+_options.id).append( 
							'<li id="'+_fname+'"> '	+ 
							'	<button type="button" title="삭제" class="ico ico_del" fname="'+_fname+'"></button><a href="#">'+filenameStr+'</a> <span class="size"></span>' + 
							'	<div class="size-fr">' + 
							'		<span><i>중복 파일</i></span>' + 
							'	</div>'+ 
							'</li>'	
						);
						
						form.remove();
					}else if(isFileTypeAllowed(_options.allowedTypes,filenameStr)){
						fileArray.push(org_filenameStr);
						//filename push...
						_options.onLoadFileName.push(filenameStr);
							
						var fileProcess = $(
							'<li id="'+_fname+'"><div class="size-fl">' + 
							'		<button type="button" title="삭제" class="ico ico_del" fname="'+_fname+'" ofname="'+org_filenameStr+'"></button><a href="#">'+filenameStr+'</a> <span class="size"></span>' + 
							'	</div>' + 
							'	<div class="size-fr">' + 
							'		<div class="size-state">' + 
							'			<div class="prgsbar">' + 
							'				<div class="bar" style="width:1%;"></div>' + 
							'			</div>' + 
							'		</div>' + 
							'		<button type="button" class="cancle_btn"><span>취소</span></button>' + 
							'	</div>'	+ 
							(true == _options.fileSeqHandler ? FILE_SEQ_AREA : '') + 
							'</li>'
						);
	
						// 첨부순서
						if (true == _options_fileSeqHandler) {
							$('#flist_'+_options.id+'>li:last').find(".btn_down").removeAttr("disabled");
							$('#flist_'+_options.id).append(fileProcess);
							if( $('#flist_'+_options.id+'>li:last').prev().html() == null ) $('#flist_'+_options.id+'>li:last').find(".btn_up").attr("disabled","true");
						} else {
							$('#flist_'+_options.id).append(fileProcess);
						}
						
						form.hide(); 
						_ajaxFormSubmit(form,_options,fileProcess, fileArray,_fname);
	
					}else{
						alert(_options.allowedTypes+"/"+filenameStr);
						$('#flist_'+_options.id).append( 
							'<li id="'+_fname+'"> '	+ 
							'	<button type="button" title="삭제" class="ico ico_del" fname="'+_fname+'"></button><a href="#">'+filenameStr+'</a> <span class="size"></span>'+ 
							'	<div class="size-fr">' +
							'		<span><i>허용하지 않는 파일 입니다.</i></span>' + 
							'	</div>' + 
							'</li>'	
						);
						form.remove();
					}
				}
	
				//data delete...
				var OBJID = _options.id;
				$('#flist_'+_options.id+' .ico_del').click(function(){
					var delname = $(this).attr('fname');
					var ofname = $(this).attr('ofname');
	
					fileBankDel(delname);
					if(ofname) onLoadFileDel(_options.onLoadFileName, ofname);
					$('#'+delname).remove();
					
					$('#flist_'+OBJID+' li:first').find(".btn_up").attr("disabled","true");
					$('#flist_'+OBJID+' li:last').find(".btn_down").attr("disabled","true");
				});
	
				//form Callback...
				_createCutomInputFile(formGroup,_options,_createCutomInputFile,_ajaxFormSubmit,_serializeAndUploadFiles); 
			 });
		},
	
		serializeAndUploadFiles: function (_options,files,_ajaxFormSubmit) {
			var fileArray = [];
			var filenameStr = "";
			var _fname = "";
			var sizeLimit = _options.sizeLimit/1024/1024;
	
			
			// 기존 추가된 파일 존재하는지 확인
			console.log('222', APPEND_FILE_BANK);
			
			
	        for(var i = 0; i < files.length; i++) {
				if (files[i].size == 0) {
					alert(files[i].name+' 파일의 용량을 확인하여 주시기 바랍니다.');
					continue;
				}
				
				if(files[i].size > _options.sizeLimit) { //syoh
					alert('첨부 건당 용량은 '+sizeLimit+'MB 미만까지 업로드 가능합니다');
					files = files[i] = '';
					return;
				}
				
				filenameStr = files[i].name;
				_fname = 'fname_'+(new Date().getTime()+parseInt(i));
				
				console.log('_options', _options);
				console.log('files', files);
				console.log('filenameStr', filenameStr);
				console.log('결과', APPEND_FILE_BANK.indexOf(filenameStr));
				
				let chk = false;
				// 중복검사
				APPEND_FILE_BANK.forEach(function(v,i){
					if(v.realname == filenameStr){
						alert('기존에 첨부되어있는 파일은 첨부할 수 없습니다.');
						chk = true;
					}
				});
				
				if(chk){
					return;
				}
				
				
				if(fileDupliChk(_options.onLoadFileName, filenameStr)){
					alert('중복된 파일을 첨부할 수 없습니다.');
					
					return;
				}else if(isFileTypeAllowed(_options.allowedTypes,filenameStr)){
					//filename push...
					_options.onLoadFileName.push(filenameStr);		
					var fileProcess = $(
						'<li id="'+_fname+'"><div class="size-fl">'	+ 
						'		<button type="button" title="삭제" class="ico ico_del" fname="'+_fname+'" ofname="'+filenameStr+'"></button><a href="#">'+filenameStr+'</a> <span class="size"></span>' +
						'	</div>' + 
						'	<div class="size-fr">' + 
						'		<div class="size-state">' + 
						'			<div class="prgsbar">' + 
						'				<div class="bar" style="width:1%;"></div>' +
						'			</div>' +
						'		</div>' + 
						'		<button type="button" class="cancle_btn"><span>취소</span></button>' +
						'	</div>' + 
						(true == _options.fileSeqHandler ? FILE_SEQ_AREA : '') + 
						'</li>'
					); 		
	
					// 첨부순서
					if (true == _options.fileSeqHandler) {
						$('#flist_'+_options.id+'>li:last').find(".btn_down").removeAttr("disabled");
						$('#flist_'+_options.id).append(fileProcess);
						if( $('#flist_'+_options.id+'>li:last').prev().html() == null ) $('#flist_'+_options.id+'>li:last').find(".btn_up").attr("disabled","true");
					} else {
						$('#flist_'+_options.id).append(fileProcess);
					}
	
					fileArray.push(filenameStr);
	
					var ts = _options;
					var fd = new FormData();
					var fileName = _options.fileName.replace("[]", "");
			
					fd.append(fileName, files[i]);
	
					var extraData = _options.formData;
					if(extraData) {
						var sData = serializeData(extraData);
						for(var j = 0; j < sData.length; j++) {
							if(sData[j]) {
								fd.append(sData[j][0], sData[j][1]);
							}
						}
					}
	
					ts.fileData = fd;
	
					var form = $("<form style='display:block; position:absolute;left:-1000px;' method='" + _options.method + "' action='" + _options.url + "' enctype='" + _options.enctype + "'></form>");
					form.appendTo('body');
	
					//object Regist...
					_ajaxFormSubmit(form,_options,fileProcess, fileArray,_fname);
				}else{
					alert(_options.allowedTypes+"/.../"+filenameStr);					
					
					return;
					/*$('#flist_'+_options.id).append( 
						'<li id="'+_fname+'"> ' + 
						'	<button type="button" title="삭제" class="ico ico_del" fname="'+_fname+'"></button><a href="#">'+filenameStr+'</a> <span class="size"></span>' + 
						'	<div class="size-fr">' + 
						'		<span><i>허용하지 않는 파일 입니다.</i></span>	' + 
						'	</div>	' + 
						'</li>'	
					);*/
				}
	        }
	
			//data delete...
	        var OBJID = _options.id;
			$('#flist_'+_options.id+' .ico_del').click(function(){
				var delname = $(this).attr('fname');
				var ofname = $(this).attr('ofname');
	
				fileBankDel(delname);
				if(ofname) onLoadFileDel(_options.onLoadFileName, ofname);
				$('#'+delname).remove();
				
				$('#flist_'+OBJID+' li:first').find(".btn_up").attr("disabled","true");
				$('#flist_'+OBJID+' li:last').find(".btn_down").attr("disabled","true");
			});
	    },
	
		ajaxFormSubmit: function (form,_options,fileProcess,fileArray,fname) {		
			// 파일을 10개 이상 첨부할 수 없음
			if(10 <= APPEND_FILE_BANK.length){
				form.remove();
				fileProcess.remove();
				uploadCancle(_options.onLoadFileName, fileArray[0]);

				alert('파일을 10개 이상 첨부할 수 없습니다.');
				
				return;
			}
			
			var currentXHR = null;
			var options = {
					cache: false,
					contentType: false,
					processData: false,
					forceSync: false,
					type: _options.method,
					data: _options.formData,
					formData: _options.fileData,
					dataType: _options.returnType,
					whichAction: _options.whichAction,
					async:false,
					
					beforeSubmit: function (formData, $form, options) {
						if(_options.onSubmit.call(this, fileArray) != false) {
							var dynData = _options.dynamicFormData();
							if(dynData) {
								var sData = serializeData(dynData);
								if(sData) {
									for(var j = 0; j < sData.length; j++)
									{
										if(sData[j]) {
											if(_options.fileData != undefined) options.formData.append(sData[j][0], sData[j][1]);
											else options.data[sData[j][0]] = sData[j][1];
										}
									}
								}
							}
						}
						
						fileProcess.find('.cancle_btn').click(function () {
							//alert("cancle");
							form.remove();
							fileProcess.remove();
							uploadCancle(_options.onLoadFileName, fileArray[0]);
							return;
						});
					},
					beforeSend: function (xhr, o) {
						fileProcess.find('.cancle_btn').show();
						
						if(!feature.formdata) //For iframe based push
						{
							fileProcess.find('.bar').css('width','5%');
						} else fileProcess.find('.bar').css('width','1%'); //Fix for small files
						
					},
					uploadProgress: function (event, position, total, percentComplete) {
						//Fix for smaller file uploads in MAC
						if(percentComplete > 98) percentComplete = 98;
						
						var percentVal = percentComplete + '%';
						if(percentComplete > 1) fileProcess.find('.bar').css('width',percentVal);
						
					},
					success: function (data, message, xhr) {
						var reData = eval(data);
						
						//For custom errors.
						if(_options.returnType == "json" && $.type(data) == "object" && data.hasOwnProperty(_options.customErrorKeyStr)) {
							
							var msg = data[_options.customErrorKeyStr];
							
							//fileProcess.find('.size-fr').html("<span><i>Error:"+msg+"</i></span>");
							//fileProcess.find('.cancle_btn').hide();
							//form.remove();
							
							form.remove();
							fileProcess.remove();
							uploadCancle(_options.onLoadFileName, fileArray[0]);
							
							// 오류일 경우 첨부된 파일을 삭제하고 오류 메세지 출력
							alert(msg);
							
							return;
						}
						
						fileProcess.find('.bar').css('width','100%');
						fileProcess.find('.cancle_btn').hide();
						
						form.remove();
						
						if(_options.appendFileListYN){
							try{
								//서버로 부터 리턴 받은 값
								var name = reData.newName;
								var realname = reData.fileOriName;
								var realpath = reData.path;
								var size = reData.size;
								var ext = reData.ext;
								var webpath = reData.webpath;
								
								
								//eins : Array Setting...
								//{name:"Xsystem_nameX1.jpg",realname:"file1.jpg",realpath:"http://harami.co.kr/file/upload",size:"2115",data:"|1|"
								fileBankAppend(fname,'|0|',fileProcess,name,realname,realpath,size, ext, webpath);
							}catch(e){
								alert(e);
							}
							//Default file checkbox create...
							//fileChkboxCreate(fname,_options.whichAction);
							console.log('APPEND_FILE_BANK.length :: ', APPEND_FILE_BANK.length);
							console.log('fname :: ' , fname);
							console.log('APPEND_FILE_BANK :: ' , APPEND_FILE_BANK);
						}
						
						return;
					},
					error: function (xhr, status, errMsg) {
						fileProcess.find('.size-fr').html("<span><i>Error: 오류</i></span>");
						form.remove();
						fileProcess.find('.cancle_btn').hide();
						
						return;
					}
			};
			
			window.setTimeout(function(){
				form.ajaxSubmit(options);
			}, 10);
	    },
	
		setDragDropHandlers: function (dragObj) {
			var _options = this.options;
			var _dragDropHoverClass = this.options.dragDropHoverClass; 
			var _dragDropContainerClass = this.options.dragDropContainerClass; 
	
			var _serializeAndUploadFiles = this.serializeAndUploadFiles;
			var _ajaxFormSubmit = this.ajaxFormSubmit;
	           		
			dragObj.on('dragenter', function (e) { 
				e.stopPropagation(); 
	            e.preventDefault(); 
	            $(this).addClass(_dragDropHoverClass); 
	        }); 
	            
			dragObj.on('dragover', function (e) { 
				e.stopPropagation(); 
				e.preventDefault();
	            var that = $(this); 
	            if (that.hasClass(_dragDropContainerClass) && !that.hasClass(_dragDropHoverClass)) { 
	                that.addClass(_dragDropHoverClass); 
	            } 
	        }); 
	        
			dragObj.on('drop', function (e) { 
	            e.preventDefault(); 
	            $(this).removeClass(_dragDropHoverClass); 
	            var files = e.originalEvent.dataTransfer.files; 
	            if(files.length < 1) { 
	               alert("멀티드레그 에러"); 
	               return; 
	            } 
				_serializeAndUploadFiles(_options,files,_ajaxFormSubmit);
	
	        }); 
	        
	        dragObj.on('dragleave', function (e) { 
	            $(this).removeClass(_dragDropHoverClass); 
	        }); 
	        
	        $(document).on('dragenter', function (e) { 
	            e.stopPropagation(); 
	            e.preventDefault(); 
	        }); 
	        
	        $(document).on('dragover', function (e) { 
	            e.stopPropagation(); 
	            e.preventDefault(); 
	            var that = $(this); 
	            if (!that.hasClass(_dragDropContainerClass)) { 
	                that.removeClass(_dragDropHoverClass); 
	            } 
	        }); 
	        
	        $(document).on('drop', function (e) { 
	            e.stopPropagation(); 
	            e.preventDefault(); 
	            $(this).removeClass(_dragDropHoverClass); 
	        }); 
	    }
	
	}//end...
  

 /* HWP CONTROL PLUGIN DEFINITION
  * ========================= */

	$.fn.fileUpload = function (option) {
		return this.each(function () {		
			var $this = $(this), 
				data = $this.data(option.id), 
				options = typeof option == 'object' && option;
	
	  		if (!data){
	  			$this.data(option.id, (data = new HGW_FileUpload(this, options)));
	  		}
		});    
	}
	
	
	$.fn.fileUpload.Constructor = HGW_FileUpload;
	
	$.fn.fileUpload.defaults = {
		id: "",
		url: "", 
		method: "POST", 
		enctype: "multipart/form-data", 
		type : 1,
		returnType: null, 
		allowDuplicates: true, 
		duplicateStrict: false, 
		allowedTypes: "*", 
		acceptFiles: "*", 
		fileName: "file", 
		formData: {}, 
		dynamicFormData: function () { return {};}, 		
		defaultFile : [],
	
		/* 첨부파일 순서변경 */
		fileSeqHandler: false,
			
		appendFileListYN : true,
	
		onLoadFormKey : [],
		onLoadFormData : [],
		onLoadFormProcess : [],
		onLoadFileName : [],
	
		maxFileSize: -1, 
		maxFileCount: -1, 
		multiple: true, 
		dragDrop: true, 
		autoSubmit: true, 
		showCancel: true, 
		showAbort: true, 
		showDone: true, 
		showDelete: true, 
		showError: true, 
		showStatusAfterSuccess: true, 
		showStatusAfterError: true, 
		showFileCounter: true, 
		fileCounterStyle: "). ", 
		showProgress: true, 
		nestedForms: true, 
		showDownload: true, 
	
		onLoad: function (obj) {}, 
		onSelect: function (files) { return true; }, 
		onSubmit: function (files, xhr) {}, 
		onSuccess: function (files, response, xhr, pd) {}, 
		onError: function (files, status, message, pd) {}, 
		onCancel: function (files, pd) {}, 
	
		downloadCallback: false, 
		deleteCallback: false, 
		afterUploadAll: false,
	
		abortButtonClass: "ajax-file-upload-abort", 
		cancelButtonClass: "ajax-file-upload-cancel", 
		dragDropContainerClass: "ajax-upload-dragdrop", 
	    dragDropHoverClass: "state-hover", 
	    errorClass: "ajax-file-upload-error", 
	    uploadButtonClass: "ajax-file-upload", 
	    dragDropStr: "<span><b>Drag &amp; Drop Files</b></span>", 
	    abortStr: "Abort", 
	    cancelStr: "Cancel", 
	    deletelStr: "Delete", 
	    doneStr: "Done", 
	    multiDragErrorStr: "Multiple File Drag &amp; Drop is not allowed.", 
	    extErrorStr: "is not allowed. Allowed extensions: ", 
	    duplicateErrorStr: "is not allowed. File already exists.", 
	    sizeErrorStr: "is not allowed. Allowed Max size: ", 
	    uploadErrorStr: "Upload is not allowed", 
	    maxFileCountErrorStr: " is not allowed. Maximum allowed files are:", 
	    downloadStr: "Download", 
	    customErrorKeyStr: "error", 
	    showQueueDiv: false, 
	    statusBarWidth: 500, 
	    dragdropWidth: 500, 
	    showPreview: false, 
	    previewHeight: "auto", 
	    previewWidth: "100%", 
	    uploadFolder:"uploads/" 
	}

}(window.jQuery);