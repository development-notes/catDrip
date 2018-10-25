<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">	
	$(document).ready(function(){
		console.log('menu', '${menuName}');
		console.log('sub', '${subName}');

		$('.${menuName}').addClass('active');
		$('.${menuName}').find('.${subName}').addClass('active');

	});
</script>

<nav class="navbar">
	<ul>
	    <li>
	    	<a href="/catDrip">홈</a>
	    </li>
	    <li class="menu1 visible-desktop">
	    	<a href="/menu1/sub1">1번 메뉴</a>
	    	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
		 		<li class="sub1">
		 			<a href="/menu1/sub1">메뉴1 보조메뉴1</a>
		 		</li>
		 		<li class="sub2">
		 			<a href="/menu1/sub2">메뉴1 보조메뉴2</a>
		 		</li>	
		 	</ul>
	    </li>
	    <li class="menu2 visible-desktop">
	    	<a href="/menu2/sub1">2번 메뉴</a>
	    	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
		 		<li class="sub1">
		 			<a href="/menu2/sub1">메뉴2 보조메뉴1</a>
		 		</li>
		 		<li class="sub2">
		 			<a href="/menu2/sub2">메뉴2 보조메뉴2</a>
		 		</li>
		 		<li class="sub3">
		 			<a href="/menu2/sub3">메뉴2 보조메뉴3</a>
		 		</li>
		 		<li class="sub4">
		 			<a href="/menu2/sub3">메뉴2 보조메뉴4</a>
		 		</li>	
		 	</ul>
	    </li>
	    <li class="menu3 visible-desktop">
	    	<a href="/menu3/sub1">3번 메뉴</a>
	    	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
		 		<li class="sub1">
		 			<a href="/menu3/sub1">메뉴3 보조메뉴1</a>
		 		</li>
		 		<li class="sub2">
		 			<a href="/menu3/sub2">메뉴3 보조메뉴2</a>
		 		</li>	
		 		<li class="sub3">
		 			<a href="/menu3/sub3">메뉴3 보조메뉴3</a>
		 		</li>	
		 	</ul>
	    </li>
  	</ul>
</nav>
<!-- <div class="nav-bar">
	<div class="nav-container">
		<div class="navbar-left">
			<div class="nav-drawer-toggle">
				<div class="nav-btn">
					<div class="line line-outer"></div>
					<div class="line line-in"></div>
					<div class="line line-outer"></div>
				</div>
			</div>
		</div>
		<div class="navbar-center">
			<div class="nav-item">
				<ul class="navbar-nav">
					<li class="menu1">
						<a href="/menu1/sub1">메뉴1</a>
					 	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
					 		<li class="sub1">
					 			<a href="/menu1/sub1">메뉴1 보조메뉴1</a>
					 		</li>
					 		<li class="sub2">
					 			<a href="/menu1/sub2">메뉴1 보조메뉴2</a>
					 		</li>	
					 	</ul>
					</li>
					<li class="menu2">
						<a href="/menu2/sub1">메뉴2</a>
					 	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
					 		<li class="sub1">
					 			<a href="/menu2/sub1">메뉴2 보조메뉴1</a>
					 		</li>
					 		<li class="sub2">
					 			<a href="/menu2/sub2">메뉴2 보조메뉴2</a>
					 		</li>	
					 	</ul>
					</li>
					<li class="menu3">
						<a href="/menu3/sub1">메뉴3</a>
					 	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
					 		<li class="sub1">
					 			<a href="/menu3/sub1">메뉴3 보조메뉴1</a>
					 		</li>
					 		<li class="sub2">
					 			<a href="/menu3/sub2">메뉴3 보조메뉴2</a>
					 		</li>
					 		<li class="sub3">
					 			<a href="/menu3/sub3">메뉴3 보조메뉴3</a>
					 		</li>
					 		<li class="sub4">
					 			<a href="/menu3/sub4">메뉴3 보조메뉴4</a>
					 		</li>	
					 	</ul>
					</li>
					<li class="menu4">
						<a href="/menu4/sub1">메뉴4</a>
					 	<ul class="nav-dropdown nav-dropdown-list nav-dropdown-animation-left">
					 		<li class="sub1">
					 			<a href="/menu4/sub1">메뉴4 보조메뉴1</a>
					 		</li>
					 		<li class="sub2">
					 			<a href="/menu4/sub2">메뉴4 보조메뉴2</a>
					 		</li>	
					 		<li class="sub3">
					 			<a href="/menu1/sub3">메뉴4 보조메뉴3</a>
					 		</li>
					 	</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="navbar-right">
			<div class="btn-radius btn-login">
				<span class="btn-txt" >로그인</span>
			</div>
		</div>
	</div>
</div> -->
