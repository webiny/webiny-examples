import { useState } from 'react';

import { PbPageDataSettings } from '@webiny/app-page-builder/types';

export type GuildPageSettingsBrandState = {
  buttonColor: string;
  buttonHoverColor: string;
  pictogramStrokeColor: string;
  pictogramCircleColor: string;
  employerNickname: string;
  employerFullName: string;
  employerUuid: string;
  isTaxGrossUp: boolean | string;
};

export type GuildPageSettingsBrandContextValue = {
  pageBrand: GuildPageSettingsBrandState;
  setPageBrand: typeof useState;
};

export interface GuildPageDataSettingsBrand extends PbPageDataSettings {
  brand?: GuildPageSettingsBrandState;
}
