declare module 'react-responsive' {
  import { ComponentType } from 'react';

  export interface MediaQueryProps {
    query?: string;
    component?: string | ComponentType<any>;
    children?: React.ReactNode | ((matches: boolean) => React.ReactNode);
    values?: {
      [key: string]: string | number;
    };
    device?: {
      [key: string]: {
        minWidth?: number;
        maxWidth?: number;
      };
    };
    orientation?: 'portrait' | 'landscape';
    aspectRatio?: string;
    scan?: 'progressive' | 'interlace';
    color?: boolean;
    colorDepth?: number;
    resolution?: number;
    minResolution?: number;
    maxResolution?: number;
    monochrome?: boolean;
    minMonochrome?: number;
    maxMonochrome?: number;
    minAspectRatio?: string;
    maxAspectRatio?: string;
    minColor?: number;
    maxColor?: number;
    minColorIndex?: number;
    maxColorIndex?: number;
    minDeviceWidth?: number;
    maxDeviceWidth?: number;
    minDeviceHeight?: number;
    maxDeviceHeight?: number;
    minHeight?: number;
    maxHeight?: number;
    minWidth?: number;
    maxWidth?: number;
    minResolution?: number;
    maxResolution?: number;
    scan?: 'progressive' | 'interlace';
  }

  export function useMediaQuery(
    query: string | MediaQueryProps,
    device?: MediaQueryProps['device'],
    values?: MediaQueryProps['values']
  ): boolean;

  export const MediaQuery: ComponentType<MediaQueryProps>;
} 