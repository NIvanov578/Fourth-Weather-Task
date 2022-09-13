import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const ErrorMessage = styled.div`
    color:red;
`

const Input = styled.input`
    height: 40px;
    width: 380px;
    border-radius: 8px;
    border: 2px solid grey;
    &:focus  {
        outline: none !important;
        border: 2px solid grey;
    }
`

export const Styled = {
    Wrapper,
    ErrorMessage,
    Input
}