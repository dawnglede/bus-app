import React from 'react';
import { BusCardContainer, Card, RouteName, City, Destination } from './style';
import { Link } from 'react-router-dom';

export const BusCard = ({ busRouteData, twCityName, setRouteUID, setRoundName }) => {

  return (
    <BusCardContainer>
      {busRouteData.map(busRoute => (
          <Link to={`/busroute/${busRoute.RouteName.Zh_tw}`} className="link">
              <Card onClick={()=> {
                setRouteUID(busRoute.RouteUID);
                setRoundName({
                  depart: busRoute.DepartureStopNameZh,
                  destination: busRoute.DestinationStopNameZh
                })
              }} >
                <RouteName>{busRoute.RouteName.Zh_tw.length < 15 ? busRoute.RouteName.Zh_tw : busRoute.RouteName.Zh_tw.slice(0, 14) + '...'}</RouteName>
                <City>{twCityName}</City>
                <Destination>{busRoute.DepartureStopNameZh} ↔ {busRoute.DestinationStopNameZh}</Destination>
              </Card>
          </Link>
      ))}
    </BusCardContainer>
    
  );

}