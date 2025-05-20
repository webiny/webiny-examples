import { FunnelModel, FunnelModelDto } from "../../../shared/models/FunnelModel";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../../../shared/models/FunnelFieldDefinitionModel";
import { FunnelStepModel, FunnelStepModelDto } from "../../../shared/models/FunnelStepModel";

type Listener = (dto: FunnelModelDto) => void;

export class FunnelVm {
    funnel: FunnelModel;
    activeStepId: string;
    listeners: Set<Listener> = new Set();

    constructor(funnel?: FunnelModel | FunnelModelDto) {
        if (funnel instanceof FunnelModel) {
            this.funnel = funnel;
        } else {
            this.funnel = new FunnelModel(funnel);
        }

        this.activeStepId = this.funnel.steps[0]?.id || "";
    }

    // Fields. 👇
    addField(dto: FunnelFieldDefinitionModelDto) {
        const newField = new FunnelFieldDefinitionModel(dto);
        this.funnel.fields.push(newField);
        this.emitChange();
    }

    removeField(id: string) {
        this.funnel.fields = this.funnel.fields.filter(field => field.id !== id);
        this.emitChange();
    }

    updateField(fieldId: string, fieldData: Partial<FunnelFieldDefinitionModelDto>) {
        const field = this.funnel.fields.find(field => field.id === fieldId);
        if (field) {
            field.populate(fieldData);
            this.emitChange();
        }
    }

    getFields() {
        return this.funnel.fields;
    }

    getFieldById(id: string) {
        return this.funnel.fields.find(field => field.id === id);
    }

    getFieldByFieldId(fieldId: string) {
        return this.funnel.fields.find(field => field.fieldId === fieldId);
    }

    getFieldsForActiveStep() {
        const step = this.funnel.steps.find(step => step.id === this.activeStepId);
        if (!step) {
            return [];
        }
        return this.funnel.fields.filter(field => field.stepId === step.id);
    }

    // Steps. 👇
    addStep(dto: FunnelStepModelDto) {
        const newStep = new FunnelStepModel(dto);
        this.funnel.steps.push(newStep);
        this.emitChange();
    }

    removeStep(stepId: string) {
        this.funnel.removeStep(stepId);
        this.emitChange();
    }

    updateStep(stepId: string, stepData: Partial<FunnelStepModelDto>) {
        this.funnel.updateStep(stepId, stepData);
        this.emitChange();
    }

    getSteps() {
        return this.funnel.steps;
    }

    getActiveStepId() {
        return this.activeStepId;
    }

    getActiveStep() {
        return this.funnel.steps.find(step => step.id === this.activeStepId);
    }

    getActiveStepIndex() {
        return this.funnel.steps.findIndex(step => step.id === this.activeStepId);
    }

    getAvailableStepIndex() {
        const currentIndex = this.getActiveStepIndex();
        return currentIndex < this.funnel.steps.length - 1 ? currentIndex + 1 : -1;
    }

    activateStepIndex(index: number) {
        const step = this.funnel.steps[index];
        if (!step) {
            return;
        }

        this.activeStepId = step.id;
        this.emitChange();
    }

    activateStep(stepId: string) {
        const step = this.funnel.steps.find(step => step.id === stepId);
        if (!step) {
            return;
        }

        this.activeStepId = step.id;
        this.emitChange();
    }

    activateFirstAvailableStep() {
        const nextStepIndex = this.getAvailableStepIndex();
        if (nextStepIndex !== -1) {
            this.activateStepIndex(nextStepIndex);
        }
    }

    // Other methods. 👇
    populateFunnel(funnel: Partial<FunnelModelDto>) {
        this.funnel.populate(funnel);
        this.emitChange();
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    getChecksum() {
        return [this.funnel.getChecksum(), this.getActiveStepId()].join();
    }

    private emitChange() {
        for (const listener of this.listeners) {
            listener(this.funnel.toDto());
        }
    }
}
