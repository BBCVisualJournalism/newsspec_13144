define(['lib/news_special/bootstrap', 'postcodeSearch', 'datalistSearch', 'lib/vendors/jquery/jQuery.XDomainRequest'], function (news, PostcodeSearch, DatalistSearch) {

    'use strict';

    function SearchNav(selector, defaultResultsSet) {
        this.selector = selector;
        this.defaultResultsSet = defaultResultsSet;
        this.init();
    }

    SearchNav.prototype = {
        init: function () {
            var searchNav = this;

            searchNav.currentSelection = searchNav.defaultResultsSet;
            searchNav.resultsSets = [
                'primary'//,
                // 'gcse',
                // 'alevel'
            ];

            for (var set in searchNav.resultsSets) {
                if (searchNav.resultsSets.hasOwnProperty(set)) {
                    new PostcodeSearch(searchNav.selector);

                    // Check for datalist support
                    if ('options' in document.createElement('datalist')) {
                        // Add datalist
                        var myDatalistSearch = new DatalistSearch('ns__name-search-form--' + searchNav.resultsSets[set], searchNav.resultsSets[set], '.ns__postcode-form-container');
                    } else {
                        // Fallback (dropdown menu)
                        // var mySelectmenuSearch = new SelectMenuSearch(searchNav.resultsSets[set]);
                        // mySelectmenuSearch.init('#ns__postcode-form--' + searchNav.resultsSets[set], searchNav.resultsSets[set]);
                    }
                }
            }
        }
    };

    return SearchNav;
});
