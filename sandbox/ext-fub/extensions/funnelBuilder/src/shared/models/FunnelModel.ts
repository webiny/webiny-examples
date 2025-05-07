import { FunnelStepModel, FunnelStepModelDto } from "./FunnelStepModel";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "./FunnelFieldDefinitionModel";
import { FunnelConditionRuleModel, FunnelConditionRuleModelDto } from "./FunnelConditionRuleModel";
import { SuccessStep } from "./steps/SuccessStep";

export interface FunnelModelDto {
    steps: FunnelStepModelDto[];
    fields: FunnelFieldDefinitionModelDto[];
    conditionRules: FunnelConditionRuleModelDto[];
}

export class FunnelModel {
    fields: FunnelFieldDefinitionModel[] = [];
    steps: FunnelStepModel[] = [];
    conditionRules: FunnelConditionRuleModel[];

    constructor(dto?: Partial<FunnelModelDto>) {
        this.fields = dto?.fields?.map(f => FunnelFieldDefinitionModel.fromDto(f)) || [];
        this.steps = dto?.steps?.map(s => FunnelStepModel.fromDto(s)) || [
            new FunnelStepModel(),
            new SuccessStep()
        ];
        if (!this.steps.find(step => step.id === "success")) {
            this.steps.push(new SuccessStep());
        }

        this.conditionRules =
            dto?.conditionRules?.map(dto => FunnelConditionRuleModel.fromDto(this, dto)) || [];
    }

    // Steps. 👇
    updateStep(stepId: string, stepDto: Partial<FunnelStepModelDto>) {
        const step = this.steps.find(s => s.id === stepId);
        if (!step) {
            return;
        }
        step.populate(stepDto);
    }

    removeStep(id: string) {
        this.steps = this.steps.filter(step => step.id !== id);
    }

    getStep(id: string) {
        return this.steps.find(step => step.id === id);
    }

    // Other methods. 👇
    populate(funnelDto: Partial<FunnelModelDto>) {
        if (funnelDto.fields) {
            this.fields = funnelDto.fields.map(f => FunnelFieldDefinitionModel.fromDto(f));
        }
        if (funnelDto.steps) {
            this.steps = funnelDto.steps.map(s => FunnelStepModel.fromDto(s));
        }
    }

    getChecksum() {
        return this.steps
            .map(step => step.getChecksum())
            .concat(this.fields.map(field => field.getChecksum()))
            .join("");
    }

    toDto(): FunnelModelDto {
        return {
            steps: this.steps.map(s => s.toDto()),
            fields: this.fields.map(f => f.toDto()),
            conditionRules: this.conditionRules.map(rule => rule.toDto())
        };
    }

    static fromDto(dto: FunnelModelDto): FunnelModel {
        return new FunnelModel(dto);
    }
}
