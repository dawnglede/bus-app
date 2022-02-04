import styled, { css } from 'styled-components';
import { MEDIA_MD, MEDIA_LG } from '../../constants/breakpoint';
import busIcon from '../../assets/bus-icon.png';

export const BusInfoContaienr = styled.div`
    max-width: 411px;
    margin: 0 auto;
    
    ${MEDIA_MD} {
        max-width: 768px;
    }
`;

export const TopBarContainer = styled.div`
    width: 411px;
    
    ${MEDIA_MD} {
        width: 768px;
    }
`;

export const TopBar = styled.div`
    width: 100%;
    border-radius: 0px 0px 16px 16px;
    background: #6B00FF;
    height: 96px;
    padding: 16px 0 16px 30px;
    position: absolute;
    top: 80px;
    left: 0;
    display: flex;
    justify-content: center;
    
    ${MEDIA_MD} {
        padding-left:7%;
        height: 114px;
    }

    ${MEDIA_LG} {
        padding-left: 26%;
    }
`;

export const City = styled.div`
    background: #42EDF0;
    border-radius: 20px;
    font-size: 14px;
    width: 58px;
    height: 20px;
    color: #6B00FF;
    font-weight: bold;
    text-align: center;
    padding-top: 3px;
`;

export const RouteName = styled.h2`
    font-size: 28px;
    color: #FFFFFF;
    font-weight: bold;
    position: absolute;
    bottom: 16px;
    
    ${MEDIA_MD} {
        font-size: 36px;
        bottom: 25px;
    }

`;

export const Stops = styled.div`
    margin-top: 30px;
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 126px;
`;

export const StopCard = styled.div`
    width: 349px;
    height: 68px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 20px 8px;
    position: relative;
    margin-bottom: 12px;
    display: flex;
    align-items: center;

    ${MEDIA_MD} {
        width: 678px;
        height: 72px;
    }
`;


export const ArrivalTime = styled.div`
    width: 72px;
    height: 28px;
    background: ${props => props.background};
    border-radius: 16px;
    color: #FFFFFF;
    font-size: 14px;
    display: inline-block;
    text-align: center;
    line-height: 28px;

    ${MEDIA_MD} {
        width: 80px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
    }
`;

export const StopName = styled.div`
    color: #5B4E6E;
    font-size: 16px;
    font-weight: 700;
    margin-left: 8px;

    ${MEDIA_MD} {
        font-size: 20px;
    }
`;

export const DestinationName = styled.span`
        margin-left: 8px;
        font-size: 14px;
        color: #5B4E6E;

        ${MEDIA_MD} {
            font-size: 16px;

        }
`;

export const StopOrder = styled.div`
    width: 30px;
    height: 24px;
    font-size: 12px;
    background: #F2F2F2;
    border-radius: 16px;
    color: #BDBDBD;
    position: absolute;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20px;
    right: 8px;

    ${MEDIA_MD} {
        font-size: 14px;
        top: 22px;
    }
`;

export const Plate = styled.div`
    width: 80px;
    height: 28px;
    background: #6B00FF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    font-size: 14px;
    line-height: 28px;
    text-align: end;
    padding: 1px 8px 0 8px;
    color: #FFFFFF;
    position: absolute;
    top: 20px;
    right: 48px;

    ${MEDIA_MD} {
        width: 86px;
        height: 32px;
        font-size: 16px;
        line-height: 28px;
    }
`;

export const BusIcon = styled.img`
    position: absolute;
    left: 9px;
    top: 7px;

    ${MEDIA_MD} {
        top: 8px;
    }
`;

