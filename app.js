function clock(){
    //initializes the date class
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var ms = time.getMilliseconds();
    
    //if hours is below 12 subtract 12 to show standard time
    if(hrs > 12){
        hrs = hrs - 12;
    }
    //if its zero then its really midnight
    if(hrs === 0){
        hrs = 12;
    }
    if(hrs < 10){
        hrs = "0" + hrs;
    }
    if(min < 10){
        min = "0" + min;
    }
    if(sec < 10){
        sec = "0" + sec;
    }
    //displays the clock
    $("#clock").text(hrs + ":" + min + ":" + sec);
    $(".nightTime").text(hrs + ":" + min);
    $(".FancyTime").text(hrs + ":" + min);
    
    //below is the code used for the fancy mode
    
    $("#hourPlus").hide();
    $("#secondPlus").hide();
    
    
    $(".hourBar").height(min * 8.3);
    $(".minuteBar").height(sec * 8.3);
    
    var minuteHeight = $(".minuteBar").height(sec * 8.3);
    // console.log(minuteHeight);
    
    /*
    if($(".minuteBar").height() >= 400){
        $("#secondPlus").slideUp(1000);
        $("#secondPlus").hide();        
    }
    */
}

function displayDate(){
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var weekday = date.getDay();
    //displays the date
    if(weekday === 0){
        $("#day").text("Sunday");
        $('#closingTime').text("12:00am");
    }
    else if(weekday === 1){
        $("#day").text("Monday");
        $('#closingTime').text("12:00am");
    }
     else if(weekday === 2){
        $("#day").text("Tuesday");
         $('#closingTime').text("12:00am");
    }
    else if(weekday === 3){
        $("#day").text("Wednesday");
        $('#closingTime').text("5:00pm & 12:00am");
    }
    else if(weekday === 4){
        $("#day").text("Thursday");
        $('#closingTime').text("12:00am");
    }
    else if(weekday === 5){
        $("#day").text("Friday");
        $('#closingTime').text("5:00pm");
    }
    else if(weekday === 6){
        $("#day").text("Saturday");
        $('#closingTime').text("6:00pm");
    }
    
    $("#date").text(month + "/" + day);
}

function displayWeather(){
    //gets the JSON file
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=38340,us&appid=4ccbe25bc75a2d2c9933c73c4b541d6b&units=imperial', function(data){ 
        $('#weather').text(Math.round(data.main.temp)) + $('#weather').append("&deg;", 'F');
        if(data.weather[0].description === "clear sky"){
            $('#weather').prepend('<img src=img/clearSky.png class="classImage LibraryImage nightImage" />');
        }
        else if(data.weather[0].description === "few clouds"){
             $('#weather').prepend('<img src=img/fewClouds.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "scattered clouds"){
             $('#weather').prepend('<img src=img/scatteredClouds.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "broken clouds"){
             $('#weather').prepend('<img src=img/brokenClouds.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "shower rain"){
             $('#weather').prepend('<img src=img/showerRain.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "rain"){
             $('#weather').prepend('<img src=img/rain.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "thunderstorm"){
             $('#weather').prepend('<img src=img/thunderStorm.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "snow"){
             $('#weather').prepend('<img src=img/snow.png class="classImage LibraryImage nightImage" />');
        }
         else if(data.weather[0].description === "mist"){
             $('#weather').prepend('<img src=img/mist.png class="classImage LibraryImage nightImage" />');
        }
        else{
            $('#weather').prepend('<img src=img/fewClouds.png class="classImage LibraryImage nightImage" />');
        }
    });
        
    
}

function switchPage(){
    //if the space bar or left and right arrow keys are pressed it will change the page
    var data = window.location;
    var page1 = "index.html";
    var page2 = "LibraryMode.html";
    var page3 = "NightMode.html";
    var page4 = "Fancy.html";
    $("body").keyup(function(key){
        if(key.which === 37 || key.which === 39 || key.which === 32){
            
            if (data.pathname === '/index.html'){
                window.location.assign(page2);
            }
            else if (data.pathname === '/LibraryMode.html'){
                window.location.assign(page3);
            }
            else if (data.pathname === '/NightMode.html'){
                window.location.assign(page4);
            }
            else if (data.pathname === '/Fancy.html'){
                window.location.assign(page1);
            }
            
        }
    });
}

function getLionAlerts() {
       $("#lionAlert").hide();
        //get the rss feed

        var rssURL = "http://www.getrave.com/rss/FHU/channel1";

        $.ajax({
            type: "GET",
            url: rssURL,
            dataType: "xml",
            error: function () {
                console.log("ERROR: Unable to load RSS feed. Check the URL and your connection status.");
            },
            success: function (xml) {

                var $items = $(xml).find("item");

                $items.each(function () {
                    // extract the alert title
                    var lionAlertTitle = $(this).find("title").text();
                    console.log(lionAlertTitle);

                    // extract the alert description 
                    var lionAlertDescription = $(this).find("description").text();
                    console.log(lionAlertDescription);

                    var lionAlertDateString = ($(this).find("pubDate").text());
                    
                    //parses the date into milliseconds
                    var lionAlertTime = Date.parse(lionAlertDateString);
                   
                    var date = new Date();
                    var currentTime = date.getTime();
                    
                    console.log(currentTime - lionAlertTime);
                    
                    
                    //if the lion alert is older than 10 minutes its hidden
                    if((currentTime - lionAlertTime) < 600000 ){
                        //hide the unimportant elements
                        $(".classModeContainer").hide();
                        $(".libContainer").hide();
                        $(".nightContent").hide();
                        $("#clock").hide();

                        // display title and description on page
                        $("#lionAlert h1").html(lionAlertTitle);
                        $("#lionAlert h2").text(lionAlertDescription);

                        // show the alert 
                        $("#lionAlert").slideDown(2000);
                   }

                });

            }
        });

    }

function main(){
    getLionAlerts();
    setInterval(clock, 500);
    displayDate();
    displayWeather();
    switchPage();
}

$(document).ready(main);