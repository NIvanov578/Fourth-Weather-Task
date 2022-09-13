import styled from 'styled-components';

const Image = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 40px;
`

const SkeletonImg = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: whitesmoke;
    animation: animation-c7515d 1.5s ease-in-out 0.5s infinite;
`
export const Styled = {
    Image,
    SkeletonImg
}