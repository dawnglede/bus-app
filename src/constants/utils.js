export const location = [
    {
        city: '基隆市',
        enCityName: 'Keelung'
    },
    {
        city: '新北市',
        enCityName: 'NewTaipei'
    },
    {
        city: '臺北市',
        enCityName: 'Taipei'
    },
    {
        city: '桃園市',
        enCityName: 'Taoyuan'
    },
    {
        city: '新竹市',
        enCityName: 'Hsinchu'
    },
    {
        city: '新竹縣',
        enCityName: 'HsinchuCounty'
    },
    {
        city: '苗栗縣',
        enCityName: 'MiaoliCounty'
    },
    {
        city: '台中市',
        enCityName: 'Taichung'
    },
    {
        city: '彰化縣',
        enCityName: 'ChanghuaCounty'
    },
    {
        city: '南投縣',
        enCityName: 'NantouCounty'
    },
    {
        city: '雲林縣',
        enCityName: 'YunlinCounty'
    },
    {
        city: '嘉義市',
        enCityName: 'Chiayi'
    },
    {
        city: '嘉義縣',
        enCityName: 'ChiayiCounty'
    },
    {
        city: '台南市',
        enCityName: 'Tainan'
    },
    {
        city: '高雄市',
        enCityName: 'Kaohsiung'
    },
    {
        city: '屏東縣',
        enCityName: 'PingtungCounty'
    },
    {
        city: '台東縣',
        enCityName: 'TaitungCounty'
    },
    {
        city: '花蓮縣',
        enCityName: 'HualienCounty'
    },
    {
        city: '澎湖縣',
        enCityName: 'PenghuCounty'
    },
    {
        city: '金門縣',
        enCityName: 'KinmenCounty'
    },
    {
        city: '連江縣',
        enCityName: 'LienchiangCounty'
    }
];



//get routeUID by stopUID
function getRouteUID(data, stopUID, routeId) {
    //let routeId = [];
    let stopInfo = [];

    for (let i =0; i< data.length; i++) {
      stopInfo.push(data[i].RouteUID);
      stopInfo.push(data[i].Stops);
      let stopInfoFlat = stopInfo.flat();
      let sameStopId = stopInfoFlat.findIndex(item => item.StopUID === `${stopUID}`);
      let repeatInfo = routeId.findIndex(item => item === stopInfoFlat[0]);
      //console.log(stopInfoFlat);
      if (sameStopId > -1 && repeatInfo === -1) {
        routeId.push(stopInfoFlat[0]);
        stopInfo = []
      } else {
        stopInfo = []
      }
      //console.log(routeId);
      };
    
   return routeId;
};

export default getRouteUID;