import styled from 'styled-components';
import { MEDIA_MD, MEDIA_LG } from '../../constants/breakpoint';


export const NavBarStyle = styled.nav`
    background-color: #FFFFFF;
    width: 100%; 
    position: relative;
    top: 0;
    height: 80px;
    overflow: hidden;

    .link {
        width: 104px;
        height: 38px;
    }
`;

export const Logo = styled.div`
    position: absolute;
    top: 20px;
    left: 30px;

    ${MEDIA_LG} {
        left: 150px;
    }
`;

export const FindBusIcon = styled.div`
    width: 104px;
    height: 38px;
    font-size: 20px;
    color: #FFFFFF;
    background: #6B00FF;
    border-radius: 100px;
    position: absolute;
    top: 21px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${MEDIA_LG} {
        right: 150px;
    }
`;

export const MenuStyle = styled.button`
    position: absolute;
    top: 20px;
    right: 30px;
    border: none;
    background: transparent;
`;

export const DropdownMenuStyle = styled.div`
    position: relative;
    top: 80px;
    width: 411px;
    height: 284px;
    background-color: #6B00FF;
    border-radius: 0 0 16px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    row-gap: 52px;
    z-index: 5;

    
    a {
        text-align: center;
        color: #FFFFFF;
        text-decoration: none;
        display: block;
        font-size: 28px;
    }

    div {
        position: absolute;
        width: 395px;
        height: 0;
        border-bottom: 1px solid #00C2BA;
        postion: absolute;
    }
    
    .first-border {
        top: 98px;
    }

    .second-border {
        bottom: 88px;
    }
`;