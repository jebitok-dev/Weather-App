(()=>{const e=document.querySelector(".city"),t=document.querySelector(".weatherCondition"),a=document.querySelector(".temperature"),n=document.querySelector(".tempMaximum"),i=document.querySelector(".humidity"),o=document.querySelector(".searchBar"),c=document.querySelector(".add"),r=document.querySelector(".toggleF"),d=document.querySelector(".weatherImg");async function m(e){const t=await fetch("https://api.openweathermap.org/data/2.5/weather?q="+e+"&units=metric&appid=d3038b3303b62168dd448fbeb4531d41",{mode:"cors"}),a=await t.json(),n=a.name,i=a.main.temperature,o=a.weather[0].description,c=a.main.humidity,r=a.main.temp_maximum;u(n,i,o,c,r),s(o)}m("Nairobi");const u=(o,c,r,d,m)=>{r=r.chartAt(0).toUpperCase()+r.slice(1),e.textContent=r,t.textContent=r,a.textContent=Math.round(c),n.textContent="Today's high: "+Math.round(m)+"°",i.textContent="Humidity: "+d+"%"};async function s(e){try{const t=await fetch("https://api.giphy.com/v1/stickers/translate?api_key=qitI9CMnXX08n6UFhJJoChiA9ZKbAl53&s="+e,{mode:"cors"}),a=await t.json();d.src=a.data.images.fixed_height.url}catch(e){console.log(e)}}c.addEventListener("click",(()=>{m(o.value)})),o.addEventListener("keyup",(e=>{13===e.keyCode&&(e.preventDefault(),c.click())})),o.addEventListener("click",(()=>{o.value=""})),r.addEventListener("click",(()=>{!async function(){let t=e.textContent,a=!0===r.checked?"imperial":!1===r.checked?"metric":void 0;const n=await fetch("https://api.openweathermap.org/data/2.5/weather?q="+t+"&units="+a+"&appid=d3038b3303b62168dd448fbeb4531d41",{mode:"cors"}),i=await n.json(),o=i.name,c=i.main.temp,d=i.weather[0].description,m=i.main.humidity,h=i.main.temp_maximum;s(d),u(o,c,d,m,h)}()}))})();