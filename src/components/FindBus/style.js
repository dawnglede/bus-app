import styled from 'styled-components';
import radioUnchecked from '../../assets/radio-unchecked.png';
import radioChecked from '../../assets/radio-checked.png';
import arrow from '../../assets/arrow.png';
import { MEDIA_MD, MEDIA_LG} from '../../constants/breakpoint';

export const SearchBusContainer = styled.div`
  max-width: 411px;
  margin: 0 auto;
  margin-bottom: 30px;
   
  img {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -999;
  }

  ${MEDIA_MD} {
    max-width: 768px;
  }

  ${MEDIA_LG} {
    max-width: 1200px;
  }

`;

export const SearchBus = styled.div`

  h1 {
      color: #6B00FF;
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      margin: 30px 0 20px 0;
  }

  ${MEDIA_MD} {
    h1 {
      margin: 60px 0 30px 0;
    }
  }
 

`;

export const SearchBox = styled.div`
   width: 379px;
   height: 208px;
   background-color: #FFFFFF;
   margin: 0 auto;
   border-radius: 16px;
   box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
   postition: relative;
   
   ${MEDIA_MD} {
    width: 500px;

   }
`;

export const SearchForm = styled.form`
  
  padding-top: 16px;
  
  input[type="radio"] { 
    display: none;
    
  }

  .searchRoute {
    padding-left: 93.5px;
  }

  .searchStop {
    padding-left: 40px;
  }

  label {
    color: #6B00FF;
    font-weight: 700;
  }

  span {
    box-sizing: content-box;
    padding-left: 8px;
    
  }

  input[type="radio"] + label span {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align:middle;
    background: url(${radioUnchecked}) no-repeat;

  }

  input[type="radio"]:checked + label span {
    background: url(${radioChecked})  no-repeat;
  }

  input[type="text"] {
    width: 293px;
    height: 51px;
    position: absolute;
    border-radius: 16px;
    border: 1px solid #E0E0E0;
    background-color: #F2F2F2;
    padding-left: 58px;
    color: #5B4E6E;
    font-size: 16px;
    font-weight: 700;
  }
  .search {
    position: absolute;
    left: 16px;
    bottom: 20px;
    color: #6B00FF;
    font-weight: 700;
    z-index: 4;
  } 

  ${MEDIA_MD} {

    .searchRoute {
      padding-left: 150px;
    }

    input[type="text"] {
      width: 414px;
    }
  }
`;

export const SelectCity = styled.select`
   appearance:none;
   -moz-appearance:none;
   -webkit-appearance:none;
   width: 355px;
   height: 55px;
   border-radius: 16px;
   border: 1px solid #E0E0E0;
   margin: 20px 12px;
   color: #5B4E6E;
   font-size: 16px;
   font-weight: 700;
   padding-left: 58px;
   background: url(${arrow}) no-repeat scroll right center transparent;
   background-color: #F2F2F2;
   position: relative;

   ${MEDIA_MD}{
     width: 476px;
   }
   
`;

export const CityName = styled.div`
    position: absolute;
    top: 40px;
    left: 28px;
    color: #6B00FF;
    font-weight: 700;
    z-index: 4;
`;

export const SearchInputContainer = styled.div`
  width: 476px;
  height: 56px;
  margin-left: 12px;
  position: relative;
`;

export const SelectCityContainer = styled.div`
  position: relative;
`;

