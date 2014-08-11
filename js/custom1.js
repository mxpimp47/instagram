<script>
         $(function () {

           // Adding the above wrapper around all the code makes sure the whole
           // DOM is loaded before any code is actually run. Its a good practice
           // read about it here: http://api.jquery.com/ready/

           var apiUrl = "https://api.instagram.com/v1/users/self/feed?access_token=264061913.395641a.eff60a5d321f4db59537f80484f663ad&callback=?"

           // This is the users url 
           // https://api.instagram.com/v1/media/popular?client_id=" + client_id + "&callback=?

           // This is the search url for 
           // https://api.instagram.com/v1/locations/search?access_token=%3CACCESS_TOKEN%3E&foursquare_v2_id=447bf8f1f964a520ec331fe3

           function success (instagramData) {
             // This is run if the ajax call is successful
             // The "instagramData" being passed to this function is the returned data from the url

             if (instagramData.meta.code != 200) {
               // If we don't get a 200 that means instagram threw an error.
               // Instead of adding the html for images to .results div, we will put the error in there so
               // we know what happend
               $('.results').html('<h1>An Error Occured</h1><p>' + instagramData.meta.error_message + '</p>');
               return
             }

             $.each(instagramData.data, function(index, gram) {
               // instagramData.data is the "data" inside the returned json. There is "meta" and "data".
               // index is just an incremental number for each gram. we don't need it yet.
               // gram is the information for EACH gram. this $.each loops over all of them.

               if (gram.type == 'image') {
                 // for this example we only care about images
                 $('.results').append(<% gram.user.profile_picture %>,<% gram.user.username %>
                                      '<% gram.images.standard_resolution.url %>', '<% gram.images.low_resolution.url %>'
                                      )
               }
               if (gram.type == 'video') {
                 // for this example we only care about videos
                 $('.results').append('<div class="col-md-3">' +
                                      '<p><img class="img-circle" style="margin-right: 5px" width="60" src="' + gram.user.profile_picture + '">' + gram.user.username + '</p>' +
                                      '<a href="#myModal" data-toggle="modal" data-img-url="' + gram.videos.standard_resolution.url +'"><video class="img-thumbnail" src="' + gram.videos.low_resolution.url + '"/></a>' +
                                      '</div>')
               }
               //$('#myModal').click(function() {
               //   $('this').append('<div class="modal-body">' + gram.images.standard_resolution.url + '</div>');
               //   console.log('clicked');
               // });

                

             });
           }



           $.ajax({
             type: "GET",
             url: apiUrl,
             dataType: "json",
             success: success // If successful we call the success function, which lives up above
           });
         });

              <script type="text/template" id="ig-data">
                <div class="container">
                  <div class="row results">
                    <div class="col-md-3">
                      <p><img class="img-circle" style="margin-right: 5px" width="60" src=" <%= gram.user.profile_picture %> "> <%= gram.user.username %> </p>
                      <a href="#myModal" data-toggle="modal" data-img-url=" <%= gram.images.standard_resolution.url %> "><img class="img-thumbnail" src=" <%= gram.images.low_resolution.url %> "/></a>
                    </div>
                  </div>
                </div>
              </script>

              var igData = $("#ig-data").html();

              $("div.container").html(_.template(tableTemplate,{data:image}));
  

      </script>