import React, { useState, useEffect } from 'react';
import { SearchBus, SearchBox, SearchForm, SearchInputContainer, SearchBusContainer, SelectCity, CityName, SelectCityContainer } from './style';
import backgroundLg from '../../assets/searchBus-lg.png';
import { BusCard } from '../BusCard/BusCard';
import { StopBusCard } from '../StopBusCard/StopBusCard';
import { location } from '../../constants/utils';
import styled from 'styled-components';
import getAuthorizationHeader from '../../BusApi/busApi';
import arrow from '../../assets/arrow.png';

export const FindBus = ({ 
    setTwCityName, 
    twCityName, 
    cityName, 
    setCityName, 
    setRouteUID, 
    routeUID, 
    setRoundName,
    setStopUID
}) => {

    //搜尋所需資料
    const [ searchMethod, setSearchMethod ] = useState('searchRoute');
    const [ routeName, setRouteName ] = useState('');
    const [ stopName, setStopName ] = useState('');
     
    //TDX API資料
    const [ busRouteData, setBusRouteData ] = useState([]);
    const [ busStopData, setBusStopData ] = useState([]);
    //const BgWidth = document.getElementById('SearchBusContainer').style.maxWidth;
    
    //取得選取縣市
    function handleSelectChange() {
        const select = document.getElementById('selectCity');
        const text = select.options[select.selectedIndex].text; 
        setTwCityName(text);
        setCityName(select.value);
    };
    
    //取得輸入路線、站牌名稱
    function handleTermChange(e) {
        e.preventDefault();
        const value = e.target.value;
        const encode = encodeURIComponent(value);
        setRouteName(value);
        setStopName(encode);
    };
    
    //判別選取搜尋模式
    function handleRadioChange() {
        const checkedRadio = document.forms.SearchForm.elements["search"];
        setSearchMethod(checkedRadio.value);
    };

     //取得公車路線、站牌API資料
    const routeUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${cityName}/${routeName}?%24top=24&%24format=JSON`;
    const stopUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/City/${cityName}?%24filter=contains(StopName%2FZh_tw%2C%20'${stopName}')&%24top=24&%24format=JSON`;
    
    const fetchBusRoute = () => {
        return fetch(routeUrl, { headers: getAuthorizationHeader() }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status > 400) {
                return [];
            }
            throw new Error('Request failed!');
        }, (e) => {
            console.log(e.message)
          })
        .then(jsonRes => setBusRouteData(jsonRes));
    };
  
    const fetchBusStop = () => {
        return fetch(stopUrl, { headers: getAuthorizationHeader() }).then(res => res.json())
        .then(jsonRes => {
            //console.log(jsonRes)
            setBusStopData(jsonRes)
        });
    };

    const isDataLoad = () => {
        if (busRouteData.length === 0 && busStopData.length === 0) return;
        return (
        searchMethod === 'searchRoute'? 
        <BusCard 
        busRouteData={busRouteData} 
        twCityName={twCityName} 
        setRouteUID={setRouteUID} 
        routeUID={routeUID} 
        setRoundName={setRoundName}
        /> : 
        <StopBusCard 
        busStopData={busStopData} 
        twCityName={twCityName} 
        setRouteUID={setRouteUID}
        setStopUID={setStopUID}
        />
        )
    }
  
    useEffect(()=>{
        if(routeName.length === 0 || stopName === 0) return;
        if(searchMethod ==='searchRoute'){
          fetchBusRoute()
        } else {
          fetchBusStop()
        }
    }, [cityName, routeName, searchMethod])


    return (
     <SearchBusContainer id="SearchBusContainer">
        <SearchBus>
            <h1>找公車</h1>
            <SearchBox>
                <SearchForm id="SearchForm">
                    <input  type="radio" id="searchRoute" name="search" value="searchRoute" onChange={handleRadioChange} defaultChecked/>
                    <label htmlFor="searchRoute" className="searchRoute"><span></span>查路線</label>
                    <input  type="radio" id="searchStop" name="search" value="searchStop" className="searchStop" onChange={handleRadioChange} />
                    <label htmlFor="searchStop" className="searchStop"><span></span>查站牌</label><br/>
                    <SelectCityContainer>
                        <CityName>縣市</CityName>
                        <SelectCity id="selectCity" onChange={handleSelectChange}>
                            <option value="">選取縣市</option>
                            {location.map(city => (
                                <option value={city.enCityName}>{city.city}</option>
                            ))}
                        </SelectCity>
                        <img src={arrow} />
                    </SelectCityContainer>
                    <SearchInputContainer>
                        <div className="search">搜尋</div>
                        <label htmlFor="searchText"></label>
                        <input type="text" id="searchText" name="searchText" onChange={handleTermChange}/>
                    </SearchInputContainer>
                </SearchForm>
            </SearchBox>
        </SearchBus>
        {isDataLoad()}
        <img src={backgroundLg} alt="background" />
     </SearchBusContainer>
    );
};

const MessageContainer = styled.div`
    margin: 30px 0;
    text-align: center;
`;

const ErrorMessage = () => {
    return (
        <MessageContainer>
            <p>已超出連線次數</p>
        </MessageContainer>
    )
}