(function () {
    'use strict';

    var insta = {

        config: {
            token: '4561657.2e000ed.e4291119239a421eb48e8fd24c58edac',
            count: 20
        },

        getFeedUrl: function () {
            return 'https://api.instagram.com/v1/users/self/feed?access_token='+ this.config.token + '&count=' + this.config.count + '&callback=?';
        },

        getMediaUrl: function (mediaId) {
            return 'https://api.instagram.com/v1/media/' + mediaId + '?access_token=' + this.config.token + '&callback=?';
        },

        init: function () {
            $.getJSON(insta.getFeedUrl(), insta.success);
        },

        renderGrams: function (grams) {
            var source = $("#gram-template").html();
            var template = Handlebars.compile(source);
            $.each(grams, function(index, gram) {
                var html = template(gram);
                $('.results').append(html);
            });
        },

        renderModal: function (data) {
            var source = $("#modal-template").html();
            var template = Handlebars.compile(source);
            var html = template(data.data);
            $('#myModal').html(html);
        },

        modalClickEvent: function () {
            $('a').click(function(){
                var mediaId = $(this).data('mediaId');
                $.getJSON(insta.getMediaUrl(mediaId), insta.renderModal);
            });
        },

        paginationClickEvent: function (responseData) {
            var paginationUrl = responseData.pagination.next_url + '&callback=?';
            $('#next-button').click(function(){
                $.getJSON(paginationUrl, insta.success);
            });
        },

        success: function (responseData) {
            if (responseData.meta.code === 200) {
                insta.renderGrams(responseData.data);
                insta.modalClickEvent();
                insta.paginationClickEvent(responseData);
            } else {
                $('.results').html('<h1>An Error Occured</h1><p>' + responseData.meta.error_message + '</p>');
            }
        }
    };

    insta.init();
}());
