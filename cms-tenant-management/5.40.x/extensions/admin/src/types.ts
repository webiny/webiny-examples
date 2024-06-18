import { CmsContentEntry } from "@webiny/app-headless-cms-common/types";
import { Company as BaseCompany } from "@demo/shared";

export interface CompanyEntry extends CmsContentEntry, BaseCompany {}
