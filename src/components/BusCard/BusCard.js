import React from 'react';
import { BusCardContainer, Card, RouteName, City, Destination } from './style';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BusCard = ({ busRouteData, twCityName, setRouteUID, setRoundName }) => {
  
  const handleClick = (busRoute) => () =>
  {
    setRouteUID(busRoute.RouteUID);
    setRoundName({
      depart: busRoute.DepartureStopNameZh,
      destination: busRoute.DestinationStopNameZh
    })
  };

  return (
    <BusCardContainer>
      {busRouteData.map((busRoute,index) => (
          <Link key={index} to={`/busroute/${busRoute.RouteName.Zh_tw}`} className="link">
              <Card onClick={handleClick(busRoute)} >
                <RouteName>{busRoute.RouteName.Zh_tw.length < 15 ? busRoute.RouteName.Zh_tw : busRoute.RouteName.Zh_tw.slice(0, 14) + '...'}</RouteName>
                <City>{twCityName}</City>
                <Destination>{busRoute.DepartureStopNameZh} ↔ {busRoute.DestinationStopNameZh}</Destination>
              </Card>
          </Link>
      ))}
    </BusCardContainer>
    
  );

};

BusCard.propTypes = {
  busRouteData: PropTypes.array, 
  twCityName: PropTypes.string, 
  setRouteUID: PropTypes.func, 
  setRoundName: PropTypes.func
};