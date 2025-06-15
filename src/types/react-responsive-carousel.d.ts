declare module 'react-responsive-carousel' {
  import { Component, ReactNode } from 'react';

  export interface CarouselProps {
    showArrows?: boolean;
    showStatus?: boolean;
    showIndicators?: boolean;
    showThumbs?: boolean;
    infiniteLoop?: boolean;
    selectedItem?: number;
    onChange?: (index: number) => void;
    onClickItem?: (index: number) => void;
    onClickThumb?: (index: number) => void;
    width?: string | number;
    useKeyboardArrows?: boolean;
    autoPlay?: boolean;
    stopOnHover?: boolean;
    interval?: number;
    transitionTime?: number;
    swipeable?: boolean;
    dynamicHeight?: boolean;
    emulateTouch?: boolean;
    centerMode?: boolean;
    centerSlidePercentage?: number;
    children?: ReactNode;
  }

  export class Carousel extends Component<CarouselProps> {}
} 