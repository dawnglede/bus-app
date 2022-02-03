import React, { useState, useEffect } from 'react';
import { BusInfoContaienr, TopBar, City, RouteName, Destination, Stops, Departure, Terminal, Arrow, StopCard, ArrivalTime, StopName, StopOrder, Plate, BusIcon, DestinationName} from './style'
import { ThemeProvider } from 'styled-components';
import busIcon from '../../assets/bus-icon.png';
import { useParams} from "react-router";
import getRouteUID from '../../constants/utils';

export const RealTimeStopInfo = ({ twCityName, cityName, roundName, stopUID }) => {
    let { routeTitle } = useParams();
    let routeId = [];
    
    //get 公車預估到站資料
    const [ estimateBusTime, setEstimateBusTime ] = useState([]);

    
    const getBusEstimateTime = async() => {
            const estimatedTimeOfArrival = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${cityName}?%24filter=contains(StopUID%2C'${stopUID}')&%24top=30&%24format=JSON`;
            const res = await fetch(estimatedTimeOfArrival);
            const jsonRes = await res.json();
                setEstimateBusTime([]);

                setEstimateBusTime(pre => [
                    ...pre,
                    {
                        routeUID: jsonRes.RouteUID,
                        direction: jsonRes.Direction,
                        stopStatus: jsonRes.StopStatus,
                        estimateTime: jsonRes.EstimateTime
                    }
                ])
        
    }

    //get 公車routeUID
    const [ departStopName, setDepartStopName ]= useState([]);
    const [ returnStopName, setReturnStopName ] = useState([]);
    const stopOfRoute = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${cityName}?%24select=RouteUID%2CRouteName%2CStops&%24format=JSON`;
 

    const getBusRouteUID = async () => {
        const res = await fetch(stopOfRoute);
        const jsonRes = await res.json();
        //console.log('stopdata', jsonRes);
        let departure = [];
        let returnRoute = [];
        
        getRouteUID(jsonRes, stopUID, routeId);
        console.log(routeId)
        getBusRoute();
    };

    //以routeUID取得路線名稱
    const [ routeInfo , setRouteInfo ] = useState([]);

    const getBusRoute = async () => {
        
        for (let i =0; i < routeId.length; i++) {
            const route = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${cityName}?%24filter=contains(RouteUID%2C%20'${routeId[i]}')&%24top=30&%24format=JSON`;

            const res = await fetch(route);
            const jsonRes = await res.json();

            setRouteInfo( pre => [
                ...pre,
                {
                    routeUID: jsonRes[0].RouteUID,
                    routeName: jsonRes[0].RouteName.Zh_tw,
                    departureStopNameZh: jsonRes[0].DepartureStopNameZh,
                    destinationStopNameZh: jsonRes[0].DestinationStopNameZh
                }
            ]);
        }
        
    }
    
    //判斷公車是否進站
    const isBusCome = (routeUid) => {
        
        //console.log('state', state);
        //console.log('stopInfo', stopInfo);
        
        //在state尋找相同UID的stop資訊，並將此物件放進新的陣列
        const estimateTime = estimateBusTime.filter(item => item.routeUID === routeUid);
        
        if ( estimateTime.length === 0) {
           return <ArrivalTime background="#BDBDBD">未發車</ArrivalTime>; 
        } else {
           return estimateTime.map(uid => {
            let time = Math.round((uid.estimateTime)/60);
            if (uid.stopStatus === 0 && time > 3) {
                return <ArrivalTime background="#00C2BA">{time}分</ArrivalTime>;
             } else if (uid.stopStatus === 0 && time <= 3) {
                return <ArrivalTime background="#EB5757" >進站中</ArrivalTime>;
             } 
             else {
                return  <ArrivalTime background="#BDBDBD">未發車</ArrivalTime>; 
             }
            });
        }
       /*<ArrivalTime background="#BDBDBD" >末班駛離</ArrivalTime>;*/
    }
    
    useEffect(() => {
        getBusRouteUID();
        getBusEstimateTime();
    }, []);

    return ( 
        <BusInfoContaienr>
            <TopBar>
               <City>{twCityName}</City>
               <RouteName>{routeTitle}</RouteName>
            </TopBar>
            <Stops>
                {routeInfo.map(info => (
                        <StopCard>
                            {estimateBusTime !== [] ? isBusCome(info.routeUID) : <ArrivalTime background="#BDBDBD" >末班駛離</ArrivalTime>}
                            <StopName>{info.routeName}<DestinationName>&gt;{info.destinationStopNameZh}</DestinationName></StopName>
                            {/*<StopOrder>{stopInfo.stopSequence}</StopOrder>*/}
                            {/*<Plate><BusIcon src={busIcon}></BusIcon>249-FY</Plate>*/}
                        </StopCard>
                ))}
            </Stops>
        </BusInfoContaienr>
    );
}
