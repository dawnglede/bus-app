import React from 'react';
import { BusCardContainer, Card, RouteName, City, Destination } from './style';
import { Link } from 'react-router-dom';

export const StopBusCard = ({ busStopData, twCityName }) => {
  return (
    <BusCardContainer>
      {busStopData.map(busStop => (
        <Card>
            <RouteName>{busStop.StopName.Zh_tw}</RouteName>
            <City>{twCityName}</City>
            <Destination>{busStop.StopAddress}</Destination>
        </Card>
      ))}
    </BusCardContainer>
    
  );

}