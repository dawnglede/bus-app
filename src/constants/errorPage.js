import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorMessage = styled.div`
    margin: 50% auto;
    text-align: center;
    font-weight: bold; 
    font-size: 32px;
    color: black;
    line-height: 40px;
`

export const ErrorPage = () => {
    return (
        <>
            <ErrorMessage>
                載入失敗
                <br/>
                <Link to="/">
                    回首頁
                </Link>
            </ErrorMessage>
        </>
    )
}