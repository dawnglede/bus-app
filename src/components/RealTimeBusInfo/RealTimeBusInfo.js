import React, { useState, useEffect } from 'react';
import { BusInfoContaienr, TopBar, City, RouteName, Destination, Stops, Departure, Terminal, Arrow, StopCard, ArrivalTime, StopName, StopOrder, Plate, BusIcon, TopBarContainer} from './style';
import busIcon from '../../assets/bus-icon.png';
import { useParams} from "react-router";
import getAuthorizationHeader from '../../BusApi/busApi';
import PropTypes from 'prop-types';
import { ErrorPage } from '../../constants/errorPage';

export const RealTimeBusInfo = ({ twCityName, cityName, routeUID, roundName }) => {
    let { routeTitle } = useParams();
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
    
    const getBusEstimatedTime = async() => {
        setEstimateDepart([]);
        setEstimateReturn([]);
        let busDeparture;
        let busReturn;
        let jsonRes = [];

        try {
            const res = await fetch(estimatedTimeOfArrival, { headers: getAuthorizationHeader() });
            jsonRes = await res.json();
        } catch(e) {
            console.log(e)
        }

        const routeData = jsonRes.filter( route => route.RouteUID === routeUID && route.StopStatus === 0);
        //console.log('routeData', routeData);
        //去程
        busDeparture = routeData.filter( route => route.Direction === 0);
        busDeparture.map(depart => setEstimateDepart(pre => ([
            ...pre,
            {
                stopUID: depart.StopUID,
                stopStatus: depart.StopStatus,
                estimateTime: depart.EstimateTime,
                stopSequence: depart.StopSequence
            }
        ])))
        //回程
        busReturn = routeData.filter( route => route.Direction === 1);
        busReturn.map(returns => setEstimateReturn(pre => ([
            ...pre,
            {
                stopUID: returns.StopUID,
                stopStatus: returns.StopStatus,
                estimateTime: returns.EstimateTime,
                stopSequence: returns.StopSequence
            }
        ])))

        //console.log('busDeparture', busDeparture);
        //console.log('busReturn', busReturn);
    }

    //get 公車路線資料
    //Direction = 0 去程; = 1 返程
    const [ departStopName, setDepartStopName ]= useState([]);
    const [ returnStopName, setReturnStopName ] = useState([]);
    const stopOfRoute = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${cityName}?%24filter=contains(RouteUID%2C%20'${routeUID}')&%24top=30&%24format=JSON`;

    const getBusStop = async () => {
        let jsonRes = [];
        let departure = [];
        let returnRoute = [];

        try {
            const res = await fetch(stopOfRoute, { headers: getAuthorizationHeader() });
            jsonRes = await res.json();
        } catch(e) {
            console.log(e)
        }
        
        //去程站牌
        departure = jsonRes.filter(stop => stop.Direction === 0);
        //console.log('departure', departure);
        if (departure.length === 0) return;
        departure[0].Stops.map(stop => setDepartStopName(pre => ([
            ...pre,
            {
                stopSequence: stop.StopSequence,
                stopName: stop.StopName.Zh_tw,
                stopUID: stop.StopUID
            }
        ])));
        //返程站牌
        returnRoute = jsonRes.filter(stop => stop.Direction === 1);
        //console.log('returnRoute', returnRoute);
        if (returnRoute.length === 0) return;
        returnRoute[0].Stops.map(stop => setReturnStopName(pre => ([
            ...pre,
            {
                stopSequence: stop.StopSequence,
                stopName: stop.StopName.Zh_tw,
                stopUID: stop.StopUID
            }
        ])));  
    
    };
    
    //判斷公車是否進站
    const isBusCome = (stopUid, busState, sequence) => {

        const sameUID = busState.filter(info => info.stopUID === stopUid)

        if (sameUID.length === 0) {
           return <ArrivalTime background="#BDBDBD">未發車</ArrivalTime>; 
        } else {
        // eslint-disable-next-line array-callback-return
        return sameUID.map(uid => {
            const estimateTime = Math.round((uid.estimateTime)/60);
            const isKeelung = cityName === 'Keelung';
            const sameSequence = sequence === uid.stopSequence;
            
            if (uid.stopStatus === 0 && estimateTime > 1 && !isKeelung) {
                return <ArrivalTime background="#00C2BA">{estimateTime}分</ArrivalTime>;
             } else if (uid.stopStatus === 0 && estimateTime <= 1) {
                return <ArrivalTime background="#EB5757">進站中</ArrivalTime>;
             } else if (uid.stopStatus === 3) {
                return  <ArrivalTime background="#BDBDBD">末班駛離</ArrivalTime>; 
             } else if (uid.stopStatus === 0 && estimateTime > 1 && sameSequence) {
                return <ArrivalTime background="#00C2BA">{estimateTime}分</ArrivalTime>;
             }
            });
        }
    }

    const [ departurePlateNum, setDeparturePlateNum ] = useState([]);
    const [ returnPlateNum, setReturnPlateNum ] = useState([]);
    const realTimeNearStop = `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/${cityName}?%24filter=contains(RouteUID%2C%20'${routeUID}')&%24format=JSON`

    const getBusPlateNum = async () => {
        setDeparturePlateNum([]);
        setReturnPlateNum([]);
        let jsonRes = [];
        try {
            const res = await fetch(realTimeNearStop, { headers: getAuthorizationHeader() });
            jsonRes = await res.json();
        } catch(e) {
            console.log(e)
        }

        let departurePlateNum = [];
        let returnPlateNum = [];

        departurePlateNum = jsonRes.filter(route => route.Direction === 0);
        departurePlateNum.map(bus => setDeparturePlateNum(pre => ([
            ...pre,
            {
                plateNumb: bus.PlateNumb,
                stopSequence: bus.StopSequence,
                eventType: bus.A2EventType,
                dutyStatus: bus.DutyStatus
            }
        ])));

        returnPlateNum = jsonRes.filter(route => route.Direction === 1);
        returnPlateNum.map(bus => setReturnPlateNum(pre => ([
            ...pre,
            {
                plateNumb: bus.PlateNumb,
                stopSequence: bus.StopSequence,
                eventType: bus.A2EventType,
                dutyStatus: bus.DutyStatus
            }
        ])));
    }

    const showBusPlateNumb = (sequence, busState) => {
        const sameSequence = busState.findIndex(stop => stop.stopSequence === sequence);
        const busStateIndex = busState[sameSequence];
        if (sameSequence > -1 && busStateIndex.eventType === 1 && busStateIndex.dutyStatus === 0) {
            return (<>
                    <StopOrder background="#6B00FF" fontcolor="#FFFFFF">{sequence}</StopOrder>
                    <Plate><BusIcon src={busIcon}></BusIcon>{busState[sameSequence].plateNumb}</Plate>
                    </>);
        } else {
            return <StopOrder background="#F2F2F2" fontcolor="#BDBDBD">{sequence}</StopOrder>
        }

    }
    
    useEffect(() => {
        getBusEstimatedTime();
        getBusPlateNum();
        const getBusPlateNumInterval = setInterval(getBusPlateNum, 10000);
        const getBusinterval = setInterval(getBusEstimatedTime, 20000);
        getBusStop();
        return () => {
            clearInterval(getBusinterval);
            clearInterval(getBusPlateNumInterval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <BusInfoContaienr>
            {departStopName.length === 0 ? <ErrorPage /> :
            <>
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
            </>
            }
            { isDeparture ? 
            <DepartureStop 
            departStopName={departStopName} 
            isBusCome={isBusCome} 
            estimateDepart={estimateDepart}
            showBusPlateNumb={showBusPlateNumb}
            departurePlateNum={departurePlateNum}
            /> : 
            <ReturnStop 
            returnStopName={returnStopName} 
            estimateReturn={estimateReturn} 
            isBusCome={isBusCome}
            returnPlateNum={returnPlateNum}
            showBusPlateNumb={showBusPlateNumb}
            />
            }
        </BusInfoContaienr>
    );
};

RealTimeBusInfo.propTypes = {
    twCityName: PropTypes.string, 
    cityName: PropTypes.string, 
    routeUID: PropTypes.string, 
    roundName: PropTypes.object
};

//去程
const DepartureStop = ({ 
    departStopName, 
    estimateDepart, 
    isBusCome, 
    showBusPlateNumb, 
    departurePlateNum 
}) => {
    return(
        <Stops>
                {departStopName.map((stopInfo,index) => (
                        <StopCard key={index}>
                            { estimateDepart.length !== 0 ? isBusCome(stopInfo.stopUID, estimateDepart, stopInfo.stopSequence) : <ArrivalTime background="#BDBDBD">末班駛離</ArrivalTime>}
                            <StopName>{stopInfo.stopName}</StopName>
                            { departurePlateNum.length !== 0 ? showBusPlateNumb(stopInfo.stopSequence,departurePlateNum) : <StopOrder background="#F2F2F2" fontcolor="#BDBDBD">{stopInfo.stopSequence}</StopOrder>}
                        </StopCard>
                ))}
        </Stops>
    )
};

DepartureStop.propTypes = {
    departStopName: PropTypes.array, 
    estimateDepart: PropTypes.array, 
    isBusCome: PropTypes.func, 
    showBusPlateNumb: PropTypes.func, 
    departurePlateNum: PropTypes.array
};

//回程
const ReturnStop = ({ 
    returnStopName, 
    estimateReturn, 
    isBusCome, 
    returnPlateNum, 
    showBusPlateNumb
}) => {
    return (
        <Stops>
                {returnStopName.map((stopInfo,index) => (
                        <StopCard key={index}>
                            {estimateReturn.length !== 0 ? isBusCome(stopInfo.stopUID, estimateReturn, stopInfo.stopSequence) : <ArrivalTime background="#BDBDBD">末班駛離</ArrivalTime>}
                            <StopName>{stopInfo.stopName}</StopName>
                            {returnPlateNum.length !== 0 ? showBusPlateNumb(stopInfo.stopSequence,returnPlateNum) : <StopOrder background="#F2F2F2" fontcolor="#BDBDBD">{stopInfo.stopSequence}</StopOrder>}
                        </StopCard>
                ))}
        </Stops>
    )
};

ReturnStop.propTypes = {
    returnStopName: PropTypes.array, 
    estimateReturn: PropTypes.array, 
    isBusCome: PropTypes.func, 
    returnPlateNum: PropTypes.array, 
    showBusPlateNumb: PropTypes.func
};