import React from 'react';
import { SpinnerProps } from './Spinner.model';
import { Styled } from './Spinner.styles';

const Spinner: React.FC<SpinnerProps> = ({isLoading}) => (
    <>
        {isLoading ?
            <Styled.Spinner viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                />
            </Styled.Spinner> 
            :
            null
        }
     </>
);

export default Spinner;
