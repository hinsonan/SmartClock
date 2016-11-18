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
    
    $("#clock").text(hrs + ":" + min + ":" + sec);
    $(".nightTime").text(hrs + ":" + min);
}

function displayDate(){
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var weekday = date.getDay();
    
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
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=38340,us&appid=4ccbe25bc75a2d2c9933c73c4b541d6b&units=imperial', function(data){ 
        $('#weather').text(Math.round(data.main.temp)) + $('#weather').append("&deg;", 'F');
        console.log(data.weather[0].main);
        //if(data.weather[0].main === "Clouds"){
            $('#weather').prepend('<img src=img/sunny.png class="classImage LibraryImage nightImage" />');
        //}
    });
        
    
}


function main(){
    setInterval(clock, 500);
    displayDate();
    displayWeather();
}

$(document).ready(main);