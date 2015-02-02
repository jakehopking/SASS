
var dashboardControllers = angular.module('dashboardControllers', []);

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
				{label: 'Businesses you may know', href: '#/friendlies'}
			]},
			{label: 'Account', href: '#/account', items:[
				{label: 'Details', href: '#/account'},
				{label: 'Password', href: '#/password'}
			]}
		]
	};
	
})
.controller('UserSummaryController', function ($scope) {
	$scope.user = {
		name: 'Alan Rowarth',
		location_name: 'Auckland region',
		joined_when: 'May 2012',
		thumbnail_src: '/static/images/user-thumb-01.jpg',
		indicators: {
			faves: 17,
			photos: 22,
			thingies: 7,
			wotsits: 29
		}
	}
})
.controller('QuotesHubController', function ($scope, $http) {
	$http.get('http://caprica:9007/api2/quoterequests/')
		.success(function (data) {
			$scope.quoterequests = data;
			window.setTimeout(function () {
			    Yellow.tabs('.tabs-menu li','.tabs-content > div');
			    Yellow.accordion('.accordion');
			}, 100);
		})
})
.controller('ReviewsHubController', function ($scope, $http) {
	$scope.reviewrequests = {
		count: 0,
		items: [
			{
				title: 'Atomic Coffee Roasters',
				blurb: "Put simply, it's the best coffee you can buy in Auckland. Superb and Put simply, it's the best coffee you can buy in Auckland. Superb and...Put simply, it's the best coffee you can buy in Auckland.",
				author_byline: 'Roberto Z',
				author_href: '#',
				rating: '5.0',
				time_descr: '10 minutes ago'
			},
			{
				title: 'Covalent Coffee Frosters',
				blurb: "To be precise, it is the finest blend I've encountered of highest quality nuts and grains In China, if you are truly one in a million, there are over 24 minutes of just staring. ",
				author_byline: 'Maximillian Z',
				author_href: '#',
				rating: '4.5',
				time_descr: '15 minutes ago'
			}
		]
	};

	//$http.get('http://caprica:9007/api2/reviewrequests/')
	//	.success(function (data) {
	//		$scope.reviewrequests = data;
	//	})
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
	
	$scope.reviews = {
		count: 0,
		items: [
			{
				title: 'Atomic Coffee Roasters',
				blurb: "Put simply, it's the best coffee you can buy in Auckland. Superb and Put simply, it's the best coffee you can buy in Auckland. Superb and...Put simply, it's the best coffee you can buy in Auckland.",
				author_byline: 'Roberto Z',
				author_href: '#',
				rating: '5.0',
				time_descr: '10 minutes ago'
			},
			{
				title: 'Covalent Coffee Frosters',
				blurb: "To be precise, it is the finest blend I've encountered of highest quality nuts and grains In China, if you are truly one in a million, there are over 24 minutes of just staring. ",
				author_byline: 'Maximillian Z',
				author_href: '#',
				rating: '4.5',
				time_descr: '15 minutes ago'
			}
		]
	};
	
	$scope.photos = {
		count: 0,
		items: [
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B6zR1bOIMAE-OKJ.jpg:large', href: '#'},
			{src: 'https://pbs.twimg.com/media/Bu14KikIQAE-WJC.jpg:large', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B6zR1bOIMAE-OKJ.jpg:large', href: '#'},
			{src: 'https://pbs.twimg.com/media/Bu14KikIQAE-WJC.jpg:large', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
			{src: 'https://pbs.twimg.com/media/B7mb6GsIUAABeWW.jpg:small', href: '#'},
		]
	};
	
	$scope.favourites = {
		count: 996,
		recent: {
			count: 995,
			items: [
				{
					rating: '5.0',
					star_count: 5,
					review_count: 123,
					title: 'Ionic Coffee Ghosters',
					href: '#',
					website_href: '#',
					directions_href: '#',
					logo_src: 'https://pbs.twimg.com/media/B7Rnp4_IgAAUUKI.jpg:large',
					address: 'Some location',
					categories: [
						{title: 'Kafes', href: '#'},
						{title: 'Koffee roastery', href: '#'}
					]
				},
				{
					rating: '4.0',
					star_count: 4,
					review_count: 321,
					title: 'Ironic Coffee Toasters',
					href: '#',
					website_href: '#',
					directions_href: '#',
					logo_src: 'https://pbs.twimg.com/media/B7buWUXCIAA98v-.jpg:large',
					address: 'Some location',
					categories: [
						{title: 'Cafes', href: '#'},
						{title: 'Coffee roastery', href: '#'}
					]
				}
			]
		},
		older: {
			count: 994,
			items: [
				{
					rating: '5.0',
					star_count: 5,
					review_count: 123,
					title: 'Ionic Coffee Ghosters',
					href: '#',
					website_href: '#',
					directions_href: '#',
					logo_src: '/static/images/business-thumb-01.jpg',
					address: 'Queen Street',
					categories: [
						{title: 'Cafes', href: '#'},
						{title: 'Coffee roastery', href: '#'}
					]
				},
				{
					rating: '5.0',
					star_count: 5,
					review_count: 123,
					title: 'Ionic Coffee Ghosters',
					href: '#',
					website_href: '#',
					directions_href: '#',
					logo_src: '/static/images/business-thumb-01.jpg',
					address: 'K Road',
					categories: [
						{title: 'Cafes', href: '#'},
						{title: 'Coffee roastery', href: '#'}
					]
				},
				{
					rating: '5.0',
					star_count: 5,
					review_count: 123,
					title: 'Ionic Coffee Ghosters',
					href: '#',
					website_href: '#',
					directions_href: '#',
					logo_src: '/static/images/business-thumb-01.jpg',
					address: 'Sylvia Park',
					categories: [
						{title: 'Cafes', href: '#'},
						{title: 'Coffee roastery', href: '#'}
					]
				},
				{
					rating: '5.0',
					star_count: 5,
					review_count: 123,
					title: 'Ionic Coffee Ghosters',
					href: '#',
					website_href: '#',
					directions_href: '#',
					logo_src: '/static/images/business-thumb-01.jpg',
					address: 'Ellerslie',
					categories: [
						{title: 'Cafes', href: '#'},
						{title: 'Coffee roastery', href: '#'}
					]
				}
			]
		}
	};
	
	$scope.businesses = {
		count: 0,
		items: [
			{
				rating: '5.0',
				star_count: 5,
				review_count: 123,
				title: 'Ionic Coffee Ghosters',
				href: '#',
				website_href: '#',
				directions_href: '#',
				logo_src: 'https://pbs.twimg.com/media/B7buWUXCIAA98v-.jpg:large',
				address: 'Devonport',
				categories: [
					{title: 'Cafes', href: '#'},
					{title: 'Coffee roastery', href: '#'}
				]
			},
			{
				rating: '3.0',
				star_count: 3,
				review_count: 234,
				title: 'Tiptronic Toffee Hipsters',
				href: '#',
				website_href: '#',
				directions_href: '#',
				logo_src: 'https://pbs.twimg.com/media/BgfaxfmIcAAJ7p6.jpg:large',
				address: 'Kalmia Street',
				categories: [
					{title: 'Kafes', href: '#'},
					{title: 'Koffee roastery', href: '#'}
				]
			},
			{
				rating: '4.0',
				star_count: 4,
				review_count: 345,
				title: 'Iconic Coffee Coasters',
				href: '#',
				website_href: '#',
				directions_href: '#',
				logo_src: 'https://pbs.twimg.com/media/BhgXEzsIcAAxAvX.jpg:large',
				address: 'Vulcan Lane',
				categories: [
					{title: 'Zafes', href: '#'},
					{title: 'Zoffee roastery', href: '#'}
				]
			},
			{
				rating: '2.0',
				star_count: 2,
				review_count: 456,
				title: 'Baryonic Banoffee Boasters',
				href: '#',
				website_href: '#',
				directions_href: '#',
				logo_src: 'https://pbs.twimg.com/media/Bg-Wd6PCUAARPMi.jpg:large',
				address: 'Sunset Boulevard',
				categories: [
					{title: 'Cafes', href: '#'},
					{title: 'Banoffee boastery', href: '#'}
				]
			},
		]
	};
		
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
		templateUrl: '/static/partial/dashboard/ydash-reviews-mini.html'
	}
})
.directive('ydashPhotosMini', function () {
	return {
		templateUrl: '/static/partial/dashboard/ydash-photos-mini.html'
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
;


