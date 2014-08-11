(function () {
    'use strict';
    var insta = insta || {};

    insta = {

        apiUrl: 'https://api.instagram.com/v1/users/self/feed?access_token=4561657.2e000ed.e4291119239a421eb48e8fd24c58edac&count=20&callback=?',

        init: function () {
            $.ajax({
                type: 'GET',
                url: insta.apiUrl,
                dataType: 'json',
                success: insta.success
            });
        },
        renderGrams: function (grams) {
            var source   = $("#gram-template").html();
            var template = Handlebars.compile(source);
            $.each(grams, function(index, gram) {
                var html = template(gram);
                $('.results').append(html);
            });
        },
        renderModal: function (data) {
            var source   = $("#modal-template").html();
            var template = Handlebars.compile(source);
            var html = template(data.data);
            $('#myModal').html(html);
        },
        clickEvent: function () {
            $('a').click(function(){
                var mediaId = $(this).data('mediaId'),
                    mediaUrl = 'https://api.instagram.com/v1/media/' + mediaId + '?access_token=4561657.2e000ed.e4291119239a421eb48e8fd24c58edac&callback=?';

                $.ajax({
                    type: 'GET',
                    url: mediaUrl,
                    dataType: 'json',
                    success: insta.renderModal
                });
            });
        },

        pagination: function () {
            $('#next-button').click(function(){
                var pageNext = $(this).pagination('pageNext'),
                paginationUrl = 'https://api.instagram.com/v1/users/self/feed?access_token=4561657.2e000ed.e4291119239a421eb48e8fd24c58edac&max_id=650122868851188382_240158815';
            });
        },

        success: function (responseData) {
            if (responseData.meta.code === 200) {
                insta.renderGrams(responseData.data);
                insta.clickEvent();
            } else {
                $('.results').html('<h1>An Error Occured</h1><p>' + responseData.meta.error_message + '</p>');
            }
        }
    };

    insta.init();
}());