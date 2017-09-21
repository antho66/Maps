var app = new App();

app.main = function(){

    app.centerOnGeolocation();// ce localiser

    generateFakeMarkers(44.257003086458845, 2.8509521484375);
    generateFakeMarkers(44, 2);


    var position = [];
    
    google.maps.event.addListener(this.map, "click", function(event){ 
        var latLng = event.latLng;
        position.push(latLng);
    });


}
var i = 0;
function generateFakeMarkers(lat, lng){ 
    i++; //console.log(i);//
    var position = {
        lat: lat,
        lng: lng
    };
    var marker = app.addMarker(position , "Festival"+i , "11/09/2017", "13/09/2017", ["rock", "pop"] ) ;
    var content = "<div> Festival "+i+" </div>";
    content += "<div>11/09/2017</div>";
    content += "<div>13/09/2017</div>";
    content+= "<p> Type de musique :</p>";
    content+= "<p> Rock </p>";
    content+= "<p> Pop </p>";
    var info = app.addInfos(content, marker);
}
     

      $('#register').submit(function(e){ // TOUT CE QUI CE PROGRAMME PENDANT LE FORMULAIRE 

          e.preventDefault();
          var position = {
              lat : parseFloat(app.$lat.val()),
              lng : parseFloat(app.$long.val())
          };

          if( app.checkErrors() ){// regarde les erreurs est les poster 
            app.posteErrors();
            return ;
            }

            else{
                $(".errors").html("");
            }
            // console.log($(app.$check));
            var markerTabType = [];
            for(var i=0;i<$(app.$check).length;i++) {
                if($(app.$check[i]).is(':checked')) {
                    markerTabType.push($(app.$check[i]).val());
                }
            }
          var marker = app.addMarker(position ,  app.$name.val() , app.$date_debut.val(), app.$date_fin.val(),markerTabType) ;
        //   console.log("addMarker");

          var content = "<div>"+ app.$name.val() + "</div>";
           content += "<div>"+ app.$date_debut.val() + "</div>";
          content += "<div>"+ app.$date_fin.val() + "</div>";
          content+= "<p> Type de musique :</p>";
         
          app.$looking.each(function(){
              if($(this).find(this.$name)){
                var content = "<div>"+ val() + "</div>";
              }
          });

          
            app.$check.each(function(){
                if($(this) .is(":checked")){
                    content +=  "<div>" + $(this).val() + "</div>";
                }
            });

            var info = app.addInfos(content, marker);
            
            //app.saveMarker();

            $('#register')[0].reset();
         
      });

       app.$inputType.change(function(){

            var elemType = [];

            app.$inputType.each(function(){
                if( $(this).is(':checked') ) {
                    elemType.push($(this).val());
                }
            });
            
            // console.log(elemType);

         for( var  marker of app.markers){

             marker.setVisible(false);

           for( var type of marker.types){

              for( var filtre of elemType){

                if( type == filtre){
                    marker.setVisible(true);
                }

              }
         
            }


         }
        });


      window.onbeforeunload = function(){
      app.saveNotes();
  }
    
 
     
