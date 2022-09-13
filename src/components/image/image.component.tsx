import React, { useState, useCallback, useEffect } from 'react';
import { ImageProps } from './image.model';
import { Styled } from './image.styles';

const ProgressiveImage: React.FC<ImageProps> =  ({ src }) => {
    const [imgSrc, setSrc] = useState('');

    const onLoad = useCallback(() => {
      setSrc(src);
    }, [src]);

    useEffect(() => {
      const img = new Image();
      img.src = src as string;
      img.addEventListener("load", onLoad);
      return () => {
        img.removeEventListener("load", onLoad);
      };
    }, [src, onLoad]);

    return (
        <>
            {imgSrc ? <Styled.Image  alt={imgSrc} src={imgSrc} /> : <Styled.SkeletonImg />} 
        </>
    )
            
  };

  export default ProgressiveImage;
