const API_KEY = `ea0d814f21151e2efab460bb2dd96bf0`;


window.addEventListener('load', ()=>{
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = temperatureSection.querySelector('span');
    let temperatureIcon = document.querySelector('.location img');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const myRegion = 'Busan';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            // const api = `https://api.openweathermap.org/data/2.5/weather?q=${myRegion}&appid=${API_KEY}&units=metric`
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    
                    // console.log(data);
                    temperatureDegree.textContent = Math.round(data.main.temp );
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;
                    
                    temperatureIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

                    temperatureSection.addEventListener('click', ()=>{
                        if (temperatureSpan.textContent === 'C'){
                            temperatureSpan.textContent ='F';
                            temperatureDegree.textContent = parseInt(temperatureDegree.textContent) + 273;
                        }else{
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = parseInt(temperatureDegree.textContent) - 273;
                        }
                    });
                })


            
        });

        
    }
});