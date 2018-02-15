import { observable } from 'mobx';

export interface IStepStore {
    id: string;
    isDone: boolean;
    duration: number;
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
    public readonly completeText: string;

    @observable public isComplete: boolean = false;
    @observable public isVisible: boolean = false;
    @observable public canProceed: boolean = false;

    public isDone: boolean;
    public duration: number = -1;
    private startTime: number;

    constructor(id: string, completeText: string) {
        this.id = id;
        this.isDone = false;
        this.completeText = completeText;
    }

    public get title() {
        return this.id;
    }

    public start() {
        this.startTime = Date.now();
    }

    public end() {
        this.duration = Date.now() - this.startTime;
    }
}
