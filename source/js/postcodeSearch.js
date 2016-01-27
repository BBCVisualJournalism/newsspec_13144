define(['lib/news_special/bootstrap', 'lib/vendors/jquery/jQuery.XDomainRequest'], function (news) {

    'use strict';

    function PostcodeSearch(selector) {
        this.selector = selector;
        this.postcodeFormContainer = news.$('#ns__postcode-form-container--primary');
        this.formEl = '';
        this.errorMessageEl = '';
        this.postcodeInputEl = '';
        this.errorStrPostcodeInvalid = 'Please enter a valid English postcode';
        this.errorStrPostcodeNotFound = 'Postcode not found. Please enter an English postcode';
        this.entityCodeSafeList = ['E06', 'E08', 'E09', 'E10', 'E11', 'W06', 'S12'];
        this.entityLookup = {
            "E06000057": 929,
            "E08000037": 390,
            "E06000001": 805,
            "E06000002": 806,
            "E06000003": 807,
            "E06000004": 808,
            "E06000005": 841,
            "E06000006": 876,
            "E06000007": 877,
            "E06000008": 889,
            "E06000009": 890,
            "E06000010": 810,
            "E06000011": 811,
            "E06000012": 812,
            "E06000013": 813,
            "E06000014": 816,
            "E06000015": 831,
            "E06000016": 856,
            "E06000017": 857,
            "E06000018": 892,
            "E06000019": 884,
            "E06000020": 894,
            "E06000021": 861,
            "E06000022": 800,
            "E06000023": 801,
            "E06000024": 802,
            "E06000025": 803,
            "E06000026": 879,
            "E06000027": 880,
            "E06000028": 837,
            "E06000029": 836,
            "E06000030": 866,
            "E06000031": 874,
            "E06000032": 821,
            "E06000033": 882,
            "E06000034": 883,
            "E06000035": 887,
            "E06000036": 867,
            "E06000037": 869,
            "E06000038": 870,
            "E06000039": 871,
            "E06000040": 868,
            "E06000041": 872,
            "E06000042": 826,
            "E06000043": 846,
            "E06000044": 851,
            "E06000045": 852,
            "E06000046": 921,
            "E06000047": 840,
            "E06000049": 895,
            "E06000050": 896,
            "E06000051": 893,
            "E06000052": 908,
            "E06000053": 420,
            "E06000054": 865,
            "E06000055": 822,
            "E06000056": 823,
            "E08000001": 350,
            "E08000002": 351,
            "E08000003": 352,
            "E08000004": 353,
            "E08000005": 354,
            "E08000006": 355,
            "E08000007": 356,
            "E08000008": 357,
            "E08000009": 358,
            "E08000010": 359,
            "E08000011": 340,
            "E08000012": 341,
            "E08000013": 342,
            "E08000014": 343,
            "E08000015": 344,
            "E08000016": 370,
            "E08000017": 371,
            "E08000018": 372,
            "E08000019": 373,
            "E08000021": 391,
            "E08000022": 392,
            "E08000023": 393,
            "E08000024": 394,
            "E08000025": 330,
            "E08000026": 331,
            "E08000027": 332,
            "E08000028": 333,
            "E08000029": 334,
            "E08000030": 335,
            "E08000031": 336,
            "E08000032": 380,
            "E08000033": 381,
            "E08000034": 382,
            "E08000035": 383,
            "E08000036": 384,
            "E09000001": 201,
            "E09000002": 301,
            "E09000003": 302,
            "E09000004": 303,
            "E09000005": 304,
            "E09000006": 305,
            "E09000007": 202,
            "E09000008": 306,
            "E09000009": 307,
            "E09000010": 308,
            "E09000011": 203,
            "E09000012": 204,
            "E09000013": 205,
            "E09000014": 309,
            "E09000015": 310,
            "E09000016": 311,
            "E09000017": 312,
            "E09000018": 313,
            "E09000019": 206,
            "E09000020": 207,
            "E09000021": 314,
            "E09000022": 208,
            "E09000023": 209,
            "E09000024": 315,
            "E09000025": 316,
            "E09000026": 317,
            "E09000027": 318,
            "E09000028": 210,
            "E09000029": 319,
            "E09000030": 211,
            "E09000031": 320,
            "E09000032": 212,
            "E09000033": 213,
            "E10000002": 825,
            "E10000003": 873,
            "E10000006": 909,
            "E10000007": 830,
            "E10000008": 878,
            "E10000009": 835,
            "E10000011": 845,
            "E10000012": 881,
            "E10000013": 916,
            "E10000014": 850,
            "E10000015": 919,
            "E10000016": 886,
            "E10000017": 888,
            "E10000018": 855,
            "E10000019": 925,
            "E10000020": 926,
            "E10000021": 928,
            "E10000023": 815,
            "E10000024": 891,
            "E10000025": 931,
            "E10000027": 933,
            "E10000028": 860,
            "E10000029": 935,
            "E10000030": 936,
            "E10000031": 937,
            "E10000032": 938,
            "E10000034": 885
        };

        this.init();
    }

    PostcodeSearch.prototype = {
        init: function () {
            var postcodeSearch = this;

            var postcodeFormElt = '<div id="ns__postcode-form-container--primary" class="ns__postcode-form-container ns__search-form-container">' +

                '<form id="ns__postcode-form--primary" class="ns__postcode-form">' +
                    '<input type="hidden" name="level" value="primary">' +
                    '<input type="hidden" name="destination" value="dfe">' +
                    '<span class="ns__input-wrapper">' +
                        '<input  id="ns__postcode-field--primary" name="location_id" class="ns__search-field" type="text" placeholder="Enter English postcode" />' +
                        '<input class="ns__button--search" name="ns__button--search" type="submit" value="Go" />' +
                    '</span>' +
                '</form>' +

                '<div class="ns__error-message"></div>' +
            '</div>';
            news.$(postcodeSearch.selector).after(postcodeFormElt);
            postcodeSearch.formEl = news.$('#ns__postcode-form--primary');
            postcodeSearch.errorMessageEl = news.$('.ns__error-message');
            postcodeSearch.postcodeInputEl = news.$('#ns__postcode-field--primary');

            postcodeSearch.setButtonState('off');

            postcodeSearch.formEl.on('submit', function (ev) {
                news.pubsub.emit('do-postcode-search', [ev]);
                return false;
            });

            news.pubsub.on('do-postcode-search', function (ev) {
                postcodeSearch.handlePostcodeFormSubmit(ev);
            });

            news.pubsub.on('postcode-input-changed', function (ev) {
                var postcodeEntered = postcodeSearch.postcodeInputEl[0].value.replace(/\s/g, ''),
                    isPostcodeValid = postcodeSearch.isValidPostcode(postcodeEntered);

                if (isPostcodeValid) {
                    postcodeSearch.errorMessageEl.addClass('ns--hide');
                    postcodeSearch.setButtonState('on');
                } else {  
                    postcodeSearch.setButtonState('off');
                }
            });

            postcodeSearch.listenForPostcodeChanges();
        },

        handlePostcodeFormSubmit: function (e) {
            var postcodeSearch = this;
            if (e.preventDefault) {
                e.preventDefault();
            }

            postcodeSearch.errorMessageEl.addClass('ns--hide');
            
            var postcodeEntered = postcodeSearch.postcodeInputEl[0].value.replace(/\s/g, ''),
                isPostcodeValid = postcodeSearch.isValidPostcode(postcodeEntered),
                postcodeURL;

            if (isPostcodeValid) {
                //look up the postcode!!
                postcodeURL = 'http://open.live.bbc.co.uk/locator/locations/' + postcodeEntered + '/details/gss-council?op=intersect&vv=2&format=json';
                $.getJSON(postcodeURL).done(function (data) {
                    postcodeSearch.handlePostcodeResponse(data);
                }).fail(postcodeSearch.handlePostcodeNotFoundError.bind(postcodeSearch));
            } else {
                postcodeSearch.handlePostcodeError(postcodeSearch.errorStrPostcodeInvalid);
            }

            return false;
        },

        handlePostcodeResponse: function (data) {
            var postcodeSearch = this;

            var dataStr = JSON.stringify(data, null, ' ');

            var detailsArr = data.response.content.details.details,
                externalId,
                nation,
                authorityName;

            if (detailsArr) {
     outerLoop: for (var a = 0; a < detailsArr.length; a++) {
                    if (detailsArr[a].data.entityCode) {

                        var entityCode = detailsArr[a].data.entityCode;
             innerLoop: for (var b = 0; b < postcodeSearch.entityCodeSafeList.length; b++) {
                            if (entityCode === postcodeSearch.entityCodeSafeList[b]) {
                                //bingo! we've fund a valid region from the postcode!!
                                externalId = detailsArr[a].externalId;
                                break outerLoop;
                            }
                        }
                    }
                }
            }
            
            if (postcodeSearch.entityLookup[externalId]) {
                //SUCCESS! :)
                window.top.location.href = 'http://www.education.gov.uk/cgi-bin/schools/performance/group.pl?qType=LA&superview=pri&no=' + postcodeSearch.entityLookup[externalId];
            } else {
                postcodeSearch.handlePostcodeNotFoundError();
            }
        },

        handlePostcodeNotFoundError: function (e) {
            var postcodeSearch = this;
            postcodeSearch.handlePostcodeError(postcodeSearch.errorStrPostcodeInvalid);
        },

        handlePostcodeError: function (message) {
            var postcodeSearch = this;
            postcodeSearch.showPostcodeError(message);
        },

        showPostcodeError: function (message) {
            var postcodeSearch = this;
            postcodeSearch.errorMessageEl.removeClass('ns--hide')
                .html(message);
        },

        listenForPostcodeChanges: function (message) {
            var postcodeSearch = this;
            postcodeSearch.postcodeInputEl.on('keyup', function (ev) {
                news.pubsub.emit('postcode-input-changed', [ev]);
                return false;
            });
            postcodeSearch.postcodeInputEl.on('change', function (ev) {
                news.pubsub.emit('postcode-input-changed', [ev]);
                return false;
            });
        },

        isValidPostcode: function (postcode) {
            postcode = postcode.replace(/\s/g, '');
            var regex = /^[A-Z]{1,2}[0-9]{1,2}([A-Z]{1,2})? ?[0-9][A-Z]{2}$/i;
            var isFullPostode = regex.test(postcode);

            if (!isFullPostode && postcode.length > 0 && postcode.length <= 4) {
                
                var firstChar = postcode.substr(0, 1), lastChar = postcode.substr(postcode.length - 1, 1);

                var firstCharAlpha = /(?![qvxQVX])[a-zA-Z]/.test(firstChar), lastCharNumeric = /[0-9]/.test(lastChar);

                var isFirstHalfPostcode = (firstCharAlpha) ? true : false;

                return isFirstHalfPostcode;
            }

            return isFullPostode;
        },

        setButtonState: function (toggleState) {
            if (toggleState === 'on') {
                news.$('.ns__postcode-form .ns__button--search').removeClass('ns--disabled');
            } else {
                news.$('.ns__postcode-form .ns__button--search').addClass('ns--disabled');
            }

        },
    };

    return PostcodeSearch;
});
