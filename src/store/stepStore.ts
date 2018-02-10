import { observable } from 'mobx';

export interface IStepStore {
    isDone: boolean;
    duration: number;
    stepView: any;
    title: string;
    isComplete: boolean;
    isVisible: boolean;
    canProceed: boolean;
    completeText: string;
    start(): void;
    end(): void;
}

export abstract class StepStoreBase implements IStepStore {
    public readonly id: string;
    public readonly title: string;
    public readonly completeText: string;
    public readonly stepView: any;

    @observable public isComplete: boolean = false;
    @observable public isVisible: boolean = false;
    @observable public canProceed: boolean = false;

    public isDone: boolean;
    public duration: number = -1;
    private _startTime: number;

    constructor(title: string, stepView: any, completeText: string) {
        this.isDone = false;
        this.title = title;
        this.completeText = completeText;
        this.stepView = stepView;
    }

    public start() {
        this._startTime = Date.now();
    }

    public end() {
        this.duration = Date.now() - this._startTime;
    }
}
