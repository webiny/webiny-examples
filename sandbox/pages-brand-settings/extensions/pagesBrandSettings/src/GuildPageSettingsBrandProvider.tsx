import React, { createContext, useMemo, useState } from 'react';

import { HigherOrderComponent } from '@webiny/app-admin';

import { GuildPageSettingsBrandState } from './types';

const defaultPageBrandValues = {
  buttonColor: '',
  buttonHoverColor: '',
  pictogramStrokeColor: '',
  pictogramCircleColor: '',
  employerNickname: '',
  employerFullName: '',
  employerUuid: '',
  isTaxGrossUp: 'true',
};

export const GuildPageSettingsBrandContext: React.Context<any> = createContext(null);

/**
 * "Normal" React context provider for the page brand settings
 * to be used in guild-webiny/apps/website/code/src/App.tsx as well as guildPageSettingsBrandProviderHOC
 * @param children
 * @returns GuildPageSettingsBrandContext.Provider
 */
export const GuildPageSettingsBrandProvider: React.FC<any> = ({ children }) => {
  const [pageBrand, setPageBrand] = useState<GuildPageSettingsBrandState>(defaultPageBrandValues);
  const pageBrandContext = useMemo(
    () => ({
      pageBrand,
      setPageBrand,
    }),
    [pageBrand]
  );
  return (
    <GuildPageSettingsBrandContext.Provider value={pageBrandContext}>
      {children}
    </GuildPageSettingsBrandContext.Provider>
  );
};

/**
 * Provider HOC to get added to the list of composed Providers in guild-webiny/apps/admin/code/src/App.tsx
 */
export const guildPageSettingsBrandProviderHOC: HigherOrderComponent<any> = PreviousProvider => {
  return function guildPageSettingsBrandProviderAdmin({ children }) {
    return (
      <GuildPageSettingsBrandProvider>
        <PreviousProvider>{children}</PreviousProvider>
      </GuildPageSettingsBrandProvider>
    );
  };
};
