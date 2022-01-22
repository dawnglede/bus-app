import React, { useState, useEffect } from 'react';
import { SearchBus, SearchBox, SearchForm, SearchInputContainer, SearchBusContainer, SelectCity, CityName, SelectCityContainer, SearchBusBg } from './style';
import backgroundSm from '../../assets/searchBus-sm.png';
import backgroundLg from '../../assets/searchBus-lg.png';
import { BusCard } from '../BusCard/BusCard';
import { StopBusCard } from '../StopBusCard/StopBusCard';

export const FindBus = ({ 
    setTwCityName, 
    twCityName, 
    cityName, 
    setCityName, 
    setRouteUID, 
    routeUID, 
    setRoundName 
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

    const routeUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${cityName}/${routeName}?%24top=24&%24format=JSON`;
    const stopUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/City/${cityName}?%24filter=contains(StopName%2FZh_tw%2C%20'${stopName}')&%24top=24&%24format=JSON`;
    
    //取得公車路線、站牌API資料
    const fetchBusRoute = () => {
        return fetch(routeUrl).then(res => res.json())
        .then(jsonRes => setBusRouteData(jsonRes));
    };
  
    const fetchBusStop = () => {
        return fetch(stopUrl).then(res => res.json())
        .then(jsonRes => setBusStopData(jsonRes));
    };
  
    useEffect(()=>{
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
                            <option>選取縣市</option>
                            <option value="Keelung">基隆市</option>
                            <option value="NewTaipei">新北市</option>
                            <option value="Taipei">臺北市</option>
                            <option value="Taoyuan">桃園市</option>
                            <option value="Hsinchu">新竹市</option>
                            <option value="HsinchuCounty">新竹縣</option>
                            <option value="MiaoliCounty">苗栗縣</option>
                            <option value="Taichung">台中市</option>
                            <option value="ChanghuaCounty">彰化縣</option>
                            <option value="NantouCounty">南投縣</option>
                            <option value="YunlinCounty">雲林縣</option>
                            <option value="Chiayi">嘉義市</option>
                            <option value="ChiayiCounty">嘉義縣</option>
                            <option value="Tainan">台南市</option>
                            <option value="Kaohsiung">高雄市</option>
                            <option value="PingtungCounty">屏東縣</option>
                            <option value="TaitungCounty">台東縣</option>
                            <option value="HualienCounty">花蓮縣</option>
                            <option value="TilanCounty">宜蘭縣</option>
                            <option value="PenghuCounty">澎湖縣</option>
                            <option value="KinmenCounty">金門縣</option>
                            <option value="LienchiangCounty">連江縣</option>
                        </SelectCity>
                    </SelectCityContainer>
                    <SearchInputContainer>
                        <div className="search">搜尋</div>
                        <label htmlFor="searchText"></label>
                        <input type="text" id="searchText" name="searchText" onChange={handleTermChange}/>
                    </SearchInputContainer>
                </SearchForm>
            </SearchBox>
            {/*BgWidth === '411px' ? <img src={backgroundSm} alt="background"/> : <img src={backgroundLg} alt="background" /> */}
        </SearchBus>
        {searchMethod === 'searchRoute' ? <BusCard busRouteData={busRouteData} twCityName={twCityName} setRouteUID={setRouteUID} routeUID={routeUID} setRoundName={setRoundName}/> : <StopBusCard busStopData={busStopData} twCityName={twCityName} setRouteUID={setRouteUID}/> }
        <img src={backgroundLg} alt="background" />
     </SearchBusContainer>
    );
};