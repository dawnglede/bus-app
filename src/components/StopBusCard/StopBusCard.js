import React from 'react';
import { BusCardContainer, Card, RouteName, City, Destination } from './style';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const StopBusCard = ({ busStopData, twCityName, setStopUID }) => {
  return (
    <BusCardContainer>
        {busStopData.map((busStop,index) => (
          <Link key={index} to={`/busstop/${busStop.StopName.Zh_tw}`} className="link">
            <Card onClick={() => setStopUID(busStop.StopUID)}>
                <RouteName>{busStop.StopName.Zh_tw.length < 15 ? busStop.StopName.Zh_tw : busStop.StopName.Zh_tw.slice(0, 14) + '...'}</RouteName>
                <City>{twCityName}</City>
                <Destination>{busStop.StopAddress}</Destination>
            </Card>
          </Link> 
        ))}
    </BusCardContainer>
  );
};

StopBusCard.propTypes = {
  busStopData: PropTypes.array, 
  twCityName: PropTypes.string, 
  setStopUID: PropTypes.func
};