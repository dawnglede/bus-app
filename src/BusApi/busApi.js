

export const getBusRoute = (city, routeName) => {
    const routeUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${routeName}?$format=JSON`;
    return fetch(routeUrl).then(response => response.json())
    .then(jsonRes => jsonRes);
}

// 取得站牌名稱
// 需要用UID篩選需要的路線站牌
/*const getBusStop = (cityName, routeUID) => {
    return fetch(`https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${cityName}?%24filter=contains(RouteUID%2C%20'${routeUID}')&%24top=30&%24format=JSON`)
    .then(res => res.json())
    .then(jsonRes => {
        if (jsonRes.Direction === 0) {
            for (let data in jsonRes) {
                data.Stops.forEach( stop => 
                    departureStopName.push({
                        stopSequence: stop.StopSequence,
                        stopName: stop.StopName.Zh_tw,
                        stopUID: stop.StopUID
                    }));
            }
        } else {
            for (let data in jsonRes) {
                data.Stops.forEach( stop => 
                    returnStopName.push({
                        stopSequence: stop.StopSequence,
                        stopName: stop.StopName.Zh_tw,
                        stopUID: stop.StopUID
                    }));
            }
        }    
    })  

};*/

//取得公車到站時間及車牌


