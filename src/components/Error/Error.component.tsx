import React from 'react'
import { ErrorProps } from './Error.model';
import { Styled } from './Error.styled';

const Error: React.FC<ErrorProps > =  ({ error })=> (
    <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
)

export default Error;