declare module 'react-i18next' {
  import { ComponentType } from 'react';

  export interface UseTranslationOptions {
    keyPrefix?: string;
    ns?: string | string[];
  }

  export interface UseTranslationResponse {
    t: (key: string, options?: any) => string;
    i18n: any;
    ready: boolean;
  }

  export function useTranslation(
    ns?: string | string[],
    options?: UseTranslationOptions
  ): UseTranslationResponse;

  export function withTranslation(
    ns?: string | string[],
    options?: UseTranslationOptions
  ): <P extends object>(component: ComponentType<P>) => ComponentType<P>;
} 