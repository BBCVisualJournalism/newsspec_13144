define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'searchNav'], function (news, ShareTools, SearchNav) {

    // ###################################################################################################
    // The following is example code and can/should be used where required.
    // ###################################################################################################

    // setTimeout(function () {
    //     news.pubsub.emit('istats', ['panel-clicked', 'newsspec-interaction', 3]);
    // }, 500);
    // setTimeout(function () {
    //     news.pubsub.emit('istats', ['quiz-end', 'newsspec-interaction', true]);
    // }, 2000);

    // Example: how to set the iframe to be a constant static height
    // news.setStaticIframeHeight(10000);

    // this.entityCodeSafeList = ['E06', 'E08', 'E09', 'E10'];

    new SearchNav('#ns__schools-nav__cta', 'primary');

    news.sendMessageToRemoveLoadingImage();
});