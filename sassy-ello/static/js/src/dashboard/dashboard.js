

var dashboardServices = angular.module('dashboardServices', [])

dashboardServices
.factory('listingSource', function ($http) {
	var getBySlug = function (listingSlug, onSuccess) {
		$http.get('/api/v2/yellow/listing/' + listingSlug + '/?load_review=1').success(onSuccess);
	}
	
	return {
		getBySlug: getBySlug
	}
})
.factory('quotesSource', function ($http) {
	return {
		load: function () {return $http.get('/px/quotes/quoterequests/');},
	};
})
.factory('navSource', function () {
	return {
		navtree: {
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
		}
	};
})
.factory('userSource', function ($http) {
	return {load: function () {return $http.get('/static/data/mockuser.json');}}
})
.factory('reviewsSource', function ($http) {
	return {load: function () {return $http.get('/static/data/mockreviews.json');}}
})
.factory('favouritesSource', function ($http) {
	return {load: function () {return $http.get('/static/data/mockfavourites.json');}}
})
.factory('photosSource', function ($http) {
	return {load: function () {return $http.get('/static/data/mockphotos.json');}}
})
.factory('friendliesSource', function ($http) {
	return {load: function () {return $http.get('/static/data/mockbusinesses.json');}}
})
.factory('xlate', function ($sce) {
	var info = function (inp) {
		var catref = inp.categoryreference_set[0];
		var desc = $sce.trustAs('html', (catref.headline ? catref.headline : '').replace('\n', '<br/>'));
		var logo_src = catref.adimage_set ? catref.adimage_set[0].logo_path : null;
		return {
			catref: catref,
			description: desc,
			logo_src: logo_src
		};
	};
	var reviews = function (rvs) {
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
	};
	var photos = function (dat) {
		var inp = dat['user_content_photos'];
		var outph = [];
		for (var i=0; i<inp.length; i++) {
			outph.push({thumb: inp[i].icon_url, src: inp[i].icon_url, href:'#'});
		}
		return {
			count: inp.length,
			items: outph
		};
	};
	
	return {
		listingInfo: info,
		listingReviews: reviews,
		listingPhotos: photos
	};
})
;

var dashboardControllers = angular.module('dashboardControllers', ['dashboardServices']);

// function checkAccordion() {
// 	if ($('.accordion > div').length) {
// 	    Yellow.accordion('.accordion');
// 	}
// 	else {
// 		setTimeout( function(){ checkAccordion(); }, 100 );
// 	}
// };

dashboardControllers
.controller('NavMainController', function ($scope, $http, $location, navSource) {
	$scope.locpath = $location.path();
	$scope.navtree = navSource.navtree;
	
	$scope.navClass = function(page) {
		var currentRoute = $location.path().substring(1);
		var pg = page.substring(2);
		return (pg === currentRoute ? 'active' : '');
	};
})
.controller('UserSummaryController', function ($scope, $http, userSource) {
	userSource.load().success(function(data){$scope.user=data;});
})
.controller('QuotesHubController', function ($scope, $http, $sce, xlate, listingSource, quotesSource) {
	window.setTimeout(function () {
	    Yellow.tabs('.tabs-menu li','.tabs-content > div');
	    Yellow.accordion('.accordion');
	}, 500);

	quotesSource.load().success(function (reqs) {
		$scope.quoterequests = reqs;
		var inj = function (i, j) {
			return function (dat) {
				$scope.quoterequests[i].response_set[j].listing = dat;
				$scope.quoterequests[i].response_set[j].listing.photos = xlate.listingPhotos(dat);
				$scope.quoterequests[i].response_set[j].listing.info = xlate.listingInfo(dat);
				$scope.quoterequests[i].response_set[j].listing.reviews = xlate.listingReviews(dat._reviews);
			}
		};
		
		/* Iterate over the listings referred to in the quote responses and fetch and inject their data */
		for (var i=0; i<reqs.length; i++) {
			for (var j=0; j<reqs[i].response_set.length; j++) {
				var resp = reqs[i].response_set[j];
				var listingslug = resp.respondent.listing_ref.split(':')[1];
				listingSource.getBySlug(listingslug, inj(i, j));
			}
		};
	});
})
.controller('ReviewsHubController', function ($scope, reviewsSource) {
	reviewsSource.load().success(function(data){$scope.reviews=data;});
})
.controller('PhotosHubController', function ($scope, photosSource) {
	photosSource.load().success(function(data){console.log(data);$scope.photos=data;});

	//Make sure that the slider items are loaded before initialization
	function checkSlider() {
		if ($('.slider-nav .grid__item').length) {
		    Yellow.slider('.slider');
		} else {
			setTimeout( function(){ checkSlider(); }, 200 );
		}
	}

	checkSlider();
})
.controller('FavouritesHubController', function ($scope, favouritesSource) {
	favouritesSource.load().success(function(data){$scope.favourites=data;});
})
.controller('DashboardHubController', function ($scope, $http, quotesSource, reviewsSource, photosSource, favouritesSource, friendliesSource) {
	
	quotesSource.load().success(function (dat){console.log(dat);$scope.quotes = dat;});
	reviewsSource.load().success(function (dat){$scope.reviews = dat;});
	photosSource.load().success(function (dat){$scope.photos = dat;});
	favouritesSource.load().success(function (dat){$scope.favourites = dat;});
	friendliesSource.load().success(function (dat){$scope.businesses = dat;});
	
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
		templateUrl: '/static/partial/dashboard/ydash-quotes-mini.html',
		scope: {
			quoterequests: '=quoterequests'
		}
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


