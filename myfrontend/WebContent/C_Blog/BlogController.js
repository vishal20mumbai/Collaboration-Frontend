MyApplication.controller("BlogController", function($scope, $http, $location,
		$rootScope, $route) {
	$scope.blog = {
		'blogId' : 0,
		'blogName' : '',
		'blogDesc' : '',
		'createdDate' : '',
		'loginname' : '',
		'status' : '',
		'likes' : 0,
		'dislikes' : 0
	}
	$scope.blogdata;
	function listBlog() {
		console.log('list Blog Method');
		$http.get('http://localhost:8080/mymiddleware/showAllBlogs').then(
				function(response) {
					console.log(response.data);
					$scope.blogdata = response.data;
				});
	}
	$scope.addBlog = function() {

		console.log('Adding Blog Information');

		$http.post('http://localhost:8080/mymiddleware/addBlog',
				$scope.blog).then(function(response) {
			$location.path("/AddBlog");
		});
	}
	$scope.approved = function(blogId) {
		console.log('Approving the Blog')
		$http.get(
				'http://localhost:8080/mymiddleware/approveBlog/' + blogId)
				.then(function(response) {
					console.log(response.data);
					$scope.blogdata = response.data;
					$scope.reload;
					listBlog();
				});
	}
	$scope.rejected = function(blogId) {
		console.log("Rejected the blog");
		$http
				.get('http://localhost:8080/mymiddleware/rejectBlog/'
								+ blogId).then(function(response) {
					console.log(response.data);
					$scope.blogdata = response.data;
					$scope.reload;
					listBlog();
				});
	}
	$scope.deleted = function(blogId) {
		console.log("Deleted");
		$http
				.get('http://localhost:8080/mymiddleware/deleteBlog/'
								+ blogId).then(function(response) {
					console.log(response.data);
					$scope.blogdata = response.data;
					$scope.reload;
					listBlog();

				});
	}
	$scope.incrementLikes = function(blogId) {
		console.log("Increment Likes");
		$http.get(
				'http://localhost:8080/mymiddleware/incrementLikesBlog/'
						+ blogId).then(function(response) {
			console.log(response.data);
			$scope.blogdata = response.data;
			$scope.reload;
			listBlog();
		});
	}
	$scope.incrementDisLikes = function(blogId) {
		console.log("Increment Likes");
		$http.get(
				'http://localhost:8080/mymiddleware/incrementDisLikesBlog/'
						+ blogId).then(function(response) {
			console.log(response.data);
			$scope.blogdata = response.data;
			$scope.reload;
			listBlog();
		});
	}
	$scope.showComment = function(blogId) {
		console.log("Show Comment Accessed");
		$rootScope.blogId = blogId;
		$location.path("/BlogComment");
	}
	listBlog();
});
