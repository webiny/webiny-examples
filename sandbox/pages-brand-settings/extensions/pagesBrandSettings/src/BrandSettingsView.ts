import { InputElement } from '@webiny/app-admin/ui/elements/form/InputElement';
import { SelectElement } from '@webiny/app-admin/ui/elements/form/SelectElement';
import { PageSettingsFormView } from '@webiny/app-page-builder/editor/ui/views/PageSettingsView/PageSettingsFormView';
import { validation } from '@webiny/validation';

/**
 * The view config for the page brand settings panel
 */
export class BrandSettingsView extends PageSettingsFormView {
  constructor() {
    super('BrandSettingsView');

    this.setTitle('Brand');

    this.addField(
      new InputElement('Employer Full Name', {
        name: 'settings.brand.employerFullName',
        label: 'Employer Full Name',
        description: 'This content is used for image alt text.',
      })
    );

    this.addField(
      new InputElement('Employer Nickname', {
        name: 'settings.brand.employerNickname',
        label: 'Employer Nickname',
        description: 'This content is used for styling.',
      })
    );

    this.addField(
      new InputElement('Employer UUID', {
        name: 'settings.brand.employerUuid',
        label: 'Employer UUID',
        description: 'This content is used for auth redirects as well as the Employer logo.',
      })
    );

    this.addField(
      new SelectElement('Tax Gross Ups', {
        name: 'settings.brand.isTaxGrossUp',
        label: 'Does the Employer offer tax gross ups?',
        description: 'Does the Employer offer tax gross ups?',
        placeholder: 'Select an option',
        options: [
          {
            value: 'true',
            label: 'Yes',
          },
          {
            value: 'false',
            label: 'No',
          },
        ],
      })
    );

    this.addField(
      new InputElement('Button HEX color', {
        name: 'settings.brand.buttonColor',
        label: 'Button HEX color',
        description:
          'Ensure the button background color is AA accessible with white/black text. -- Contrast checker tool: https://webaim.org/resources/contrastchecker/',
        validators: () => validation.create('hexColor'),
      })
    );

    this.addField(
      new InputElement('Button hover HEX color', {
        name: 'settings.brand.buttonHoverColor',
        label: 'Button hover HEX color',
        description:
          'Ensure the button background color is AA accessible with white/black text. -- Contrast checker tool: https://webaim.org/resources/contrastchecker/',
        validators: () => validation.create('hexColor'),
      })
    );

    this.addField(
      new InputElement('Pictogram stroke HEX color', {
        name: 'settings.brand.pictogramStrokeColor',
        label: 'Pictogram stroke HEX color',
        description: 'This content is optional.',
        validators: () => validation.create('hexColor'),
      })
    );

    this.addField(
      new InputElement('Pictogram background circle HEX color', {
        name: 'settings.brand.pictogramCircleColor',
        label: 'Pictogram background circle HEX color',
        description: 'This content is optional.',
        validators: () => validation.create('hexColor'),
      })
    );

    this.applyPlugins(BrandSettingsView);
  }
}
