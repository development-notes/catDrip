<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
<title>메인화면</title>
<jsp:include page="../common/commonLink.jsp" flush="false"></jsp:include>

<script type="text/javascript">	
	$(document).ready(function(){
		$('.container').load('/main/${menu}/${sub}');
	});
</script>
</head>
<body>
	<div style="height: 1000px;">
		<div class="top_menu">
			<jsp:include page="../menu/top_menu.jsp"></jsp:include>
		</div>
	
		<div class="container">
			시작 페이지
		</div>
		<footer class="footer">
			<jsp:include page="../menu/footer.jsp"></jsp:include>
		</footer>
	</div>
</body>
</html>