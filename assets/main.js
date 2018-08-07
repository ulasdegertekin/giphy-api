var animalNames= ["cat", "dog", "bird", "sheep"];


function displayAnimals(event) {
    // var animal= $(this).attr("data-name");
    var queryUrl= "https://api.giphy.com/v1/gifs/search?q=" + event.target.innerHTML + "&api_key=nf5pdoAHZWKX52J3AYxlNkSTGlgDVhB7&limit=10";
   
    
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({ 
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var j= 0; j <response.data.length; j++){
            var animalDiv= $("<div class='animal m-2 rounded' style= 'background-color: rgb(221, 206, 188'>");
            //rating of animal gif
            var rating= response.data[j].rating;
            var parOne= $("<p class='text-light bg-dark rounded-top text-center font-weight-bold mb-0' style= 'background-color: rgb(174, 174, 236'>").text("Rating: " + rating);
            
            animalDiv.append(parOne);
            var imageUrl = response.data[j].images.fixed_height_still.url;
            var animalImg= $("<img>").attr("src",imageUrl);
            animalImg.attr("alt", "animal image");
            animalImg.addClass("gif rounded-bottom");
            animalImg.attr("data-state", "still");
            animalImg.attr("data-animate", response.data[j].images.fixed_height.url);
            animalImg.attr("data-still", response.data[j].images.fixed_height_still.url);
            animalDiv.append(animalImg);
            $("#images-sent").after(animalDiv);
      
        }
      //creating div for animals 
      
      
      
    });
    
}
   
function searchClick() {
    $("#name-blocks").empty();

    for (var i= 0; i < animalNames.length; i++) {
        var a= $("<button>");
        a.addClass("btn-image m-1 btn btn-light mt-2");
        a.attr(animalNames[i]);
        a.text(animalNames[i]);
        $("#name-blocks").append(a);  
    }
        
} 
    
$("#add-image").on("click",function(event){
    event.preventDefault();
    var animal= $("#animal-input").val().trim();
    animalNames.push(animal);
    searchClick();
});

$(document).on("click", ".gif", function() {                                          
    console.log(this);
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } 
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".btn-image",displayAnimals);
searchClick();
console.log(animalNames);
console.log(searchClick);
console.log();
   
