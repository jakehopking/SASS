$(function () {

    Yellow.selectProxy('.srp-filter-bar select');

    Yellow.srpFilter('#search-filter');

    Yellow.equalizeHeight('.item--bronze .business-score .review-score, .item--bronze .business-content', 'max');

    // Yellow.equalizeHeight('.search-results__item .business-score > .grid, .search-results__item .business-content', 'max');
    
    Yellow.srpMap();

});
