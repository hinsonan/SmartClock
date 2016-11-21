function clock(){
    //initializes the date class
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    
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
        console.log(data.weather[0].main);
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
    });
        
    
}


function main(){
    setInterval(clock, 500);
    displayDate();
    displayWeather();
}

$(document).ready(main);