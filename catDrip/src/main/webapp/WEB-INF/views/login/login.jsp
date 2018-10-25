<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>로그인</title>

<link rel="stylesheet" type="text/css" href="/css/login.css">

</head>
<body>
	<div class="modal-dialog">
		<div style="text-align: center;">
			<h1 style="font-size: x-large;">
				로그인 시스템<small> [Login System] </small>
			</h1>
		</div>
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header" style="padding: 35px 50px;">
				<h4>로그인</h4>
				<label>테스트 용도로 사용하는 페이지 입니다.</label>
			</div>
			<div class="modal-body" style="padding: 40px 50px;">
				<form role="form" method="post" action="/login/loginProcess.jh">
					<div class="form-group">
						<label for="emp_no"> ID :</label> 
						<input type="text" class="form-control" id="id" name="id" placeholder="Enter ID" required="required">
					</div>
					<div class="form-group">
						<label for="pw"> Password :</label> 
						<input type="password" class="form-control" id="pw" name="pw" placeholder="Enter Password" required="required" value="0000">
					</div>
					
					<button type="submit" class="btn btn-default btn-block">Login</button>
				</form>		
				
			</div>
			<div class="modal-footer"></div>
		</div>
	</div>
</body>
</html>