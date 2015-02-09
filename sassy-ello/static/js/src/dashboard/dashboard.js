
var dashboardControllers = angular.module('dashboardControllers', []);

// function checkAccordion() {
// 	if ($('.accordion > div').length) {
// 	    Yellow.accordion('.accordion');
// 	}
// 	else {
// 		setTimeout( function(){ checkAccordion(); }, 100 );
// 	}
// };

dashboardControllers
.controller('NavMainController', function ($scope, $http, $location) {
	$scope.locpath = $location.path();
	$scope.navtree = {
		label: '<root>',
		items: [
			{label: 'Dashboard', href:'#/', items:[
				{label: 'Quotes', href: '#/quotes', badge_text: '2'},
				{label: 'Reviews', href: '#/reviews'},
				{label: 'Photos', href: '#/photos'},
				{label: 'Favourites', href: '#/favourites'},
			]},
			{label: 'Account', href: '#/account', items:[
				{label: 'Details', href: '#/account'},
				{label: 'Password', href: '#/password'}
			]}
		]
	};
	
	$scope.navClass = function(page) {
		var currentRoute = $location.path().substring(1);
		var pg = page.substring(2);
		return (pg === currentRoute ? 'active' : '');
	};
})
.controller('UserSummaryController', function ($scope, $http) {
	$http.get('/static/data/mockuser.json').success(function(data){$scope.user=data;});
})
.controller('QuotesHubController', function ($scope, $http, $sce) {
	$http.get('/px/quotes/quoterequests/')
	.success(function (reqs) {
		$scope.quoterequests = reqs;
		window.setTimeout(function () {
		    Yellow.tabs('.tabs-menu li','.tabs-content > div');
		    Yellow.accordion('.accordion');
		}, 100);
		var inj = function (i, j) {
			return function (dat) {
				$scope.quoterequests[i].response_set[j].listing = dat;
				$scope.quoterequests[i].response_set[j].listing.photos = function (inp) {
					var outph = [];
					for (var i=0; i<inp.length; i++) {
						outph.push({src: inp[i].icon_url, href:'#'});
					}
					return {
						count: inp.length,
						items: outph
					};
				}(dat['user_content_photos']);
				$scope.quoterequests[i].response_set[j].listing.info = function (inp) {
					var catref = inp.categoryreference_set[0];
					var desc = $sce.trustAs('html', (catref.headline ? catref.headline : '').replace('\n', '<br/>'));
					var logo_src = catref.adimage_set ? catref.adimage_set[0].logo_path : null;
					return {
						catref: catref,
						description: desc,
						logo_src: logo_src
					};
				}(dat);
				$scope.quoterequests[i].response_set[j].listing.reviews = function (rvs) {
					var outrvs = [];
					for (var i=0; i<rvs.length; i++) {
						var r = rvs[i];
						outrvs.push({
							title: '',
							blurb: r.comments,
							author_byline: r.user.profile.displayname,
							author_href: '',
							rating: r.rating/2,
							star_count: r.rating/2,
							time_descr: r.created,
							address: '',
							helpful_count: 0,
							not_helpful_count: 0
						});
					}
					return {
						count: outrvs.length,
						items: outrvs
					};
				}(dat._reviews);
			}
		};
		for (var i=0; i<reqs.length; i++) {
			for (var j=0; j<reqs[i].response_set.length; j++) {
				var resp = reqs[i].response_set[j];
				var listingslug = resp.respondent.listing_ref.split(':')[1];
				$http.get('/api/v2/yellow/listing/' + listingslug + '/?load_review=1').success(inj(i, j));
			}
		}
	})
})
.controller('ReviewsHubController', function ($scope, $http) {
	$http.get('/static/data/mockreviews.json').success(function(data){$scope.reviews=data;});
})
.controller('PhotosHubController', function ($scope, $http) {
	$http.get('/static/data/mockphotos.json').success(function(data){$scope.photos=data;});
})
.controller('FavouritesHubController', function ($scope, $http) {
	$http.get('/static/data/mockfavourites.json').success(function(data){$scope.favourites=data;});
})
.controller('DashboardHubController', function ($scope, $http) {
	
	$scope.quotes = {
		count: 999,
		items: [
			{title: 'Weed my garden', response_count: '3'},
			{title: 'Clean my house', response_count: '2'},
			{title: 'Remove my garbage', response_count: '1'},
		]
	}
	
	$http.get('/static/data/mockreviews.json').success(function(data){$scope.reviews=data;});
	$http.get('/static/data/mockphotos.json').success(function(data){$scope.photos=data;});
	$http.get('/static/data/mockfavourites.json').success(function(data){$scope.favourites=data;});
	$http.get('/static/data/mockbusinesses.json').success(function(data){$scope.businesses=data;});

	//Make sure that the "Stars" elements are loaded before initialization
	checkStars();

	function checkStars() {
		if ($('.star-rater').length) {
		    Yellow.starRater('.star-rater');
		} else {
			setTimeout( function(){ checkStars(); }, 200 );
		}
	}

});

var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'dashboardControllers']);

dashboardApp
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/quotes', {
			templateUrl: '/static/partial/dashboard/ydash-quotes-main.html',
			controller: 'QuotesHubController'
		})
		.when('/reviews', {
			templateUrl: '/static/partial/dashboard/ydash-reviews-main.html',
			controller: 'ReviewsHubController'
		})
		.when('/photos', {
			templateUrl: '/static/partial/dashboard/ydash-photos-main.html',
			controller: 'PhotosHubController'
		})
		.when('/favourites', {
			templateUrl: '/static/partial/dashboard/ydash-favourites-main.html',
			controller: 'FavouritesHubController'
		})
		.when('/account', {
			templateUrl: '/static/partial/dashboard/ydash-account-main.html',
			controller: 'UserSummaryController'
		})
		.when('/password', {
			templateUrl: '/static/partial/dashboard/ydash-password-main.html',
			controller: 'UserSummaryController'
		})
		.when('/', {
			templateUrl: '/static/partial/dashboard/ydash-main.html',
			controller: 'DashboardHubController'
		})
		.otherwise({
			redirectTo: '/'
		})
	}
])
.directive('ydashQuoteRequest', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-quotes-request.html'
	};
})
.directive('ydashQuoteResponse', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-quotes-response.html'
	};
})
.directive('ydashReviewsMini', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-reviews-mini.html',
		scope: {
			reviews: '=reviews'
		}
	}
})
.directive('ydashPhotosMini', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-photos-mini.html',
		scope: {
			photos: '=photos'
		}
	}
})
.directive('ydashFavouritesMini', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-favourites-mini.html'
	}
})
.directive('ydashBusinessesMini', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-businesses-mini.html'
	}
})
.directive('ydashQuotesMini', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-quotes-mini.html'
	}
})
.directive('ydashStars', function () {
	return {
		template: '<i ng-repeat="j in [1,2,3,4,5]|limitTo:count" class="fa fa-star"></i><i ng-if="(count%1!==0)" class="fa fa-star-half-o"></i>',
		scope: {
			count: '=count'
		}
	}
})
;


