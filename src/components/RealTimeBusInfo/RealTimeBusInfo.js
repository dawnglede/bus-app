import React, { useState, useEffect } from 'react';
import { BusInfoContaienr, TopBar, City, RouteName, Destination, Stops, Departure, Terminal, Arrow, StopCard, ArrivalTime, StopName, StopOrder, Plate, BusIcon, TopBarContainer} from './style';
import busIcon from '../../assets/bus-icon.png';
import { useParams} from "react-router";

export const RealTimeBusInfo = ({ twCityName, cityName, routeUID, roundName }) => {
    let { routeTitle } = useParams();
    
    const [ plate, setPlate ] = useState('');
    const [ isDeparture, setIsDeparture ] = useState(true);

    const changeColor = () => {
        if (isDeparture) {
            setIsDeparture(false);
        } else {
            setIsDeparture(true);
        }
    }

    //get 公車預估到站資料
    const [ estimateDepart, setEstimateDepart ] = useState([]);
    const [ estimateReturn, setEstimateReturn ] = useState([]);
    const estimatedTimeOfArrival = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${cityName}?%24filter=contains(RouteUID%2C%20'${routeUID}')&%24format=JSON`;
    
    const getBus = async() => {
        const res = await fetch(estimatedTimeOfArrival);
        const jsonRes = await res.json();
            setEstimateDepart([]);
            setEstimateReturn([]);
            let busDeparture;
            let busReturn;

            const routeData = jsonRes.filter( route => route.RouteUID === routeUID && route.StopStatus === 0);
            console.log('routeData', routeData);
            //去程
            busDeparture = routeData.filter( route => route.Direction === 0);
            if (busDeparture) {
                busDeparture.map( depart => setEstimateDepart(pre => ([
                ...pre,
                {
                    stopUID: depart.StopUID,
                    stopStatus: depart.StopStatus,
                    estimateTime: depart.EstimateTime
                }
            ])))
            }

            //回程
            busReturn = routeData.filter( route => route.Direction === 1);
            if (busReturn) {
                busReturn.map( depart => setEstimateReturn(pre => ([
                ...pre,
                {
                    stopUID: depart.StopUID,
                    stopStatus: depart.StopStatus,
                    estimateTime: depart.EstimateTime
                }
            ])))
            }

            console.log('busDeparture', busDeparture);
            console.log('busReturn', busReturn);
        
    }

    //get 公車路線資料
    //Direction = 0 去程; = 1 返程
    const [ departStopName, setDepartStopName ]= useState([]);
    const [ returnStopName, setReturnStopName ] = useState([]);
    const stopOfRoute = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${cityName}?%24filter=contains(RouteUID%2C%20'${routeUID}')&%24top=30&%24format=JSON`;

    const getBusStop = async () => {
        const res = await fetch(stopOfRoute);
        const jsonRes = await res.json();
        //console.log('stopdata', jsonRes);
        let departure = [];
        let returnRoute = [];
        //去程站牌
        departure = jsonRes.filter(stop => stop.Direction === 0);
        //console.log('departure', departure);
        departure[0].Stops.map(stop_1 => setDepartStopName(pre => ([
            ...pre,
            {
                stopSequence: stop_1.StopSequence,
                stopName: stop_1.StopName.Zh_tw,
                stopUID: stop_1.StopUID
            }
        ])));
        //返程站盤
        returnRoute = jsonRes.filter(stop_2 => stop_2.Direction === 1);
        //console.log('returnRoute', returnRoute);
        returnRoute[0].Stops.map(stop_3 => setReturnStopName(pre_1 => ([
            ...pre_1,
            {
                stopSequence: stop_3.StopSequence,
                stopName: stop_3.StopName.Zh_tw,
                stopUID: stop_3.StopUID
            }
        ])));  
    
    };
    
    //判斷公車是否進站
    const isBusCome = (stopUid, busState) => {
        
        //console.log('state', state);
        //console.log('stopInfo', stopInfo);
        
        //在state尋找相同UID的stop資訊，並將此物件放進新的陣列
        let sameUID = busState.filter(info => info.stopUID === stopUid)
        console.log(busState);
        if ( sameUID.length === 0) {
           return <ArrivalTime background="#BDBDBD">未發車</ArrivalTime>; 
        } else {
        return sameUID.map(uid => {
            let estimateTime = Math.round((uid.estimateTime)/60);
            if (uid.stopStatus === 0 && estimateTime > 3) {
                return <ArrivalTime background="#00C2BA">{estimateTime}分</ArrivalTime>;
             } else if (uid.stopStatus === 0 && estimateTime <= 3) {
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
        getBus();
        const interval = setInterval(getBus, 40000);
        getBusStop();
        return () => {
            clearInterval(interval);
        }
    }, []);

    return ( 
        <BusInfoContaienr>
            <TopBar>
                <TopBarContainer>
                    <City>{twCityName}</City>
                    <RouteName>{routeTitle}</RouteName>
                </TopBarContainer>
            </TopBar>
            <Destination>
               <Departure onClick={changeColor} className={ isDeparture ? 'clicked' : 'unclick' } >{roundName.depart}</Departure>
               <Arrow><i className="upper-left"></i><i className="lower-left"></i><i className="upper-right"></i><i className="lower-right"></i></Arrow>
               <Terminal onClick={changeColor} className={ isDeparture ? 'unclick' : 'clicked' } >{roundName.destination}</Terminal>
            </Destination>
            { isDeparture ? 
            <DepartureStop 
            departStopName={departStopName} 
            isBusCome={isBusCome} 
            estimateDepart={estimateDepart}
            /> : 
            <ReturnStop 
            returnStopName={returnStopName} 
            estimateReturn={estimateReturn} 
            isBusCome={isBusCome}
            />
            }
        </BusInfoContaienr>
    );
}

//去程
const DepartureStop = ({ departStopName, estimateDepart, isBusCome }) => {
    return(
        <Stops>
                {departStopName.map( stopInfo => (
                        <StopCard>
                            { estimateDepart !== [] ? isBusCome(stopInfo.stopUID, estimateDepart) : <ArrivalTime background="#BDBDBD" >末班駛離</ArrivalTime>}
                            <StopName>{stopInfo.stopName}</StopName>
                            <StopOrder>{stopInfo.stopSequence}</StopOrder>
                            {/*<Plate><BusIcon src={busIcon}></BusIcon>249-FY</Plate>*/}
                            </StopCard>
                            ))}
        </Stops>
    )
}

//回程
const ReturnStop = ({ returnStopName, estimateReturn, isBusCome}) => {
    return (
        <Stops>
                {returnStopName.map( stopInfo => (
                        <StopCard>
                            {estimateReturn !== [] ? isBusCome(stopInfo.stopUID, estimateReturn) : <ArrivalTime background="#BDBDBD" >末班駛離</ArrivalTime>}
                            <StopName>{stopInfo.stopName}</StopName>
                            <StopOrder>{stopInfo.stopSequence}</StopOrder>
                            {/*<Plate><BusIcon src={busIcon}></BusIcon>249-FY</Plate>*/}
                        </StopCard>
                ))}
        </Stops>
    )
}