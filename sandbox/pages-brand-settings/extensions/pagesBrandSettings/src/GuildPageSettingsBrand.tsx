import React from 'react';

import { UIViewPlugin } from '@webiny/app-admin/ui/UIView';
import { PageSettingsView } from '@webiny/app-page-builder/editor/ui/views/PageSettingsView';
import { PbPageSettingsFieldsPlugin } from '@webiny/app-page-builder/types';
import { AddQuerySelectionPlugin } from '@webiny/app/plugins/AddQuerySelectionPlugin';
import { PluginCollection } from '@webiny/plugins/types';
import { gql } from 'graphql-tag';

// import PaletteIcon from '@guildeducationinc/recess/icons/PaletteIcon';

import { BrandSettingsView } from './BrandSettingsView';

/**
 * Adds a new settings tab for Brand Settings \
 * Has the right-panel BrandSettingsView listed \
 * Also has the query changes needed to populate the new settings panel
 */
export const guildPageSettingsBrandEditor: PluginCollection = [
  new UIViewPlugin<PageSettingsView>(PageSettingsView, view => {
    view.addSection({
      id: 'brand',
      title: 'Brand',
      description: 'Manage brand settings for this page specifically.',
      icon: <div>🎨</div>,
      view: new BrandSettingsView(), // the form that renders on the right side of the settings view
    });
  }),
  // Add a selection to outgoing `GetPage` GraphQL operation
  new AddQuerySelectionPlugin({
    operationName: 'PbGetPage',
    selectionPath: 'pageBuilder.getPage.data',
    addSelection: gql`
      {
        settings {
          brand {
            buttonColor
            buttonHoverColor
            pictogramStrokeColor
            pictogramCircleColor
            employerNickname
            employerFullName
            employerUuid
            isTaxGrossUp
          }
        }
      }
    `,
  }),
];

/**
 * GQL page settings fields extension for use in the website getPublishedPageQuery \
 */
export const guildPageSettingsBrandFields: PbPageSettingsFieldsPlugin[] = [
  {
    name: 'pb-page-settings-fields-brand',
    type: 'pb-page-settings-fields',
    fields: `
          brand {
              buttonColor
              buttonHoverColor
              pictogramStrokeColor
              pictogramCircleColor
              employerNickname
              employerFullName
              employerUuid
              isTaxGrossUp
          }
      `,
  },
];
