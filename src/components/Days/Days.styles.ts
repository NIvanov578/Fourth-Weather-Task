import styled from 'styled-components';

const DaysWrapper = styled.div`
    margin-top: 20px;
    display:flex;
    flex-direction: row;
`
const DayBox = styled.div`
    display:flex;
    flex-direction: column;
    margin-bottom:20px;
    height: 400px;
    width:200px;
    border:1px solid black;
    margin-right: 15px;
    align-items: start;
    justify-content: space-evenly;
    background: lightskyblue;
`


const Row = styled.span`
    display:inline-block;
    margin-left: 10px;
    color:#4B5563;
    font-weight: 600;
    font-size: 16px;
`


export const Styled = {
    DaysWrapper,
    DayBox,
    Row,
    
}