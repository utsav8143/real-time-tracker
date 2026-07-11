const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        // emit or handle the coordinates here
        socket.emit('send-location', { latitude, longitude });
    }, (err) => {
        console.error('Geolocation error:', err);
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    });
}

const map=L.map("map").setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{

}).addTo(map)

const marker={ }

socket.on("recieve-location",(data)=>{
    const {id, latitude, longitude}=data
    map.setView([latitude,longitude])
    if(marker[id]){
        marker[id].setLatLng([latitude,longitude], 16)
    }else{
        marker[id]=L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on("user-disconnected",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id]
    }
})