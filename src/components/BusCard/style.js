import styled from 'styled-components';
import { MEDIA_MD, MEDIA_LG} from '../../constants/breakpoint';

export const BusCardContainer = styled.div`
  width: 379px;
  margin: 30px auto 0 auto;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(242, 242, 242, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 16px;
  flex-wrap: wrap; 
  gap: 20px 16px;
  position: relative;

  .link {
    width: 92%;
    height: 90px;
  }
  
  ${MEDIA_MD} {
    width: 648px;

    .link{
      width: 300px;
    }
  }

  ${MEDIA_LG} {
    width: 1140px;

    .link {
      width: 358.67px;
    }
  }

`;

export const Card = styled.div`
  width: 100%;
  height: 90px;
  border-radius: 16px;
  background-color: #6B00FF;
  cursor: pointer;
  padding: 16px;
  position: relative;
  

  &:hover {
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
  }

`;



export const RouteName = styled.p`
  width: 100%;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  
  ${MEDIA_MD} {
    font-size: 20px
  }

`;

export const City = styled.div`
  width: 58px;
  height: 20px;
  background: #42EDF0;
  border-radius: 20px;
  color: #6B00FF;
  font-size: 14px;
  text-align: center;
  vertical-align: center;
  padding: 3px;
  position: absolute;
  top: 16px;
  right: 16px;

`;

export const Destination = styled.p`
  color: #FFCC00;
  font-size: 14px;
  margin-top: 7px;
  font-weight: 500px;
  position: absolute;
  bottom: 16px;

  ${MEDIA_MD} {
    font-size: 16px;
  }
`;