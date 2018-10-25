<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">
	
	$(document).ready(function(){
		$('#table-sub2').bootstrapTable();
	});
	
	var sub2Params = function(params){
    	return {
        	recordCountPerPage: params.pageSize,
        	firstIndex: params.pageSize * (params.pageNumber - 1),
        	search: params.searchText,
        	name: params.sortName,
        	order: params.sortOrder,
        	node_id: '197'
    	}
	};
</script>
<body>
	<div style="height: 880px;">
		<div class="page-header">
			<h3><a href="/menu1/sub2">sub2 page</a></h3>
		</div>
		<div>
			<div class="flex-wrap">
	    	</div>
	    	<div class="flex-right">
	    		<a class="ed link-primary" href="">쓰기</a>
	  		</div>
		</div>
		
		<table class="table table-hover table-condensed"
			id="table-sub2" data-toggle="table" data-url="/table/select/test" 
			data-pagination="true"  data-height="800"
			data-show-refresh="false" data-show-columns="false" data-page-size="20"  data-side-pagination="server"
			data-query-params="sub2Params" data-toolbar="#custom-toolbar">	
			<thead>
				<tr>
					<th data-width="50"	 data-field="PK_NUM" 		 	data-align="center" >번호</th>
		            <th 				 data-field="CONTENT" 	 	data-align="left">제목</th>
		            <th data-width="50"  data-field="USER_NAME"  		data-align="center" >작성자</th>
		        	<th data-width="10"	 data-field="RECOMMENDED" 	 	data-align="center" >추천수</th>
		            <th data-width="150"  data-field="INSERT_DATE"  		data-align="center" >등록일</th>
				</tr>
			</thead>
		</table>		
	</div>
</body>