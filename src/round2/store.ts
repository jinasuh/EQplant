import { action, computed, observable, reaction } from 'mobx';
import { IAssignment, TreatmentType } from 'src/store';
import { IStepStore } from 'src/store/stepStore';
import { IntroductionStore, TasksStore, SurveyStore } from 'src/round2/steps';

export type DataId = 'responses' | 'empathyRatings' | 'gender' | 'age' | 'literacy' | 'comment';

export interface IResponseTask {
    conversationId: number;
    treatmentType: TreatmentType;
}
export interface IStudyInput extends IAssignment {
    tasks: IResponseTask[];
}

export type StudyInputData = {
    precision: number;
    conversationIds: string;
    treatmentTypes: string;
};

export type StudyInputId = keyof StudyInputData;

export const studySetting = {
    compensation: '$1.00',
    duration: 'about 15 minutes'
};

export const defaultStudyInputData = <StudyInputData>{
    precision: 0.6,
    treatmentTypes: '[0,1,0]',
    conversationIds: '[1,2,3]'
};

export interface IStoreProps {
    store: Store;
}

export class Store {
    public readonly accepted: boolean = false;
    public readonly steps: IStepStore[] = [];

    @observable public responses: { [conversationId: number]: string } = {};
    @observable public empathyRatings: { [conversationId: number]: string } = {};
    @observable public gender: string;
    @observable public age: string;
    @observable public literacy: string;
    @observable public comment: string;

    @observable public currentTaskIndex: number = 0;
    @observable public currentStepIndex: number = 0;
    @observable public currentResponse: string;

    private readonly studyInput: IStudyInput;
    @observable private _canSubmitResponseTask = false;

    constructor() {
        // Parse query strings
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        var queryParams: any = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            queryParams[pair[0]] = pair[1];
        }

        var assignmentId = queryParams['assignmentId'];
        this.accepted = assignmentId && assignmentId != 'ASSIGNMENT_ID_NOT_AVAILABLE';

        const data = <StudyInputData>window.data || defaultStudyInputData;

        const conversationIds = <number[]>JSON.parse(data.conversationIds);
        const treatmentTypes = <TreatmentType[]>JSON.parse(data.treatmentTypes);
        const tasks = conversationIds.map(
            (cid, idx) =>
                <IResponseTask>{
                    conversationId: cid,
                    treatmentType: treatmentTypes[idx]
                }
        );

        this.studyInput = <IStudyInput>{
            assignmentId,
            hitId: queryParams['hitId'],
            workerId: queryParams['workerId'],
            tasks: tasks
        };

        reaction(
            () => this._canSubmitResponseTask,
            canSubmit => {
                $('#submitButton')
                    .prop('disabled', !canSubmit)
                    .attr('value', 'Submit Task');
            }
        );

        const introStore = new IntroductionStore();
        const tasksStore = new TasksStore();
        const surveyStore = new SurveyStore();

        this.steps.push(introStore);
        this.steps.push(tasksStore);
        this.steps.push(surveyStore);
    }

    @computed
    public get tasks(): IResponseTask[] {
        return this.studyInput.tasks;
    }

    @action.bound
    public addData(key: DataId, data: string) {
        this[key] = data;
        this._canSubmitResponseTask =
            Object.keys(this.responses).length === this.tasks.length &&
            this._isValid(this.gender) &&
            this._isValid(this.age) &&
            this._isValid(this.literacy);
    }

    @action.bound
    public addResponse(conversationId: number, response: string) {
        this.responses[conversationId] = response;
        this.currentResponse = this.responses[conversationId];
    }

    @action.bound
    public getNextTask() {
        if (this.currentTaskIndex >= this.tasks.length - 1) {
            this.completeCurrentStep();
        } else {
            this.currentTaskIndex++;
        }
    }

    @action.bound
    public completeCurrentStep() {
        const currentStore = this.steps[this.currentStepIndex];
        currentStore.isComplete = true;
        currentStore.isVisible = false;
        currentStore.end();

        const nextStore = this.steps[this.currentStepIndex + 1];
        if (nextStore) {
            if (this.currentStepIndex + 1 == this.steps.length - 1) {
                $('#submitButton')
                    .prop('disabled', false)
                    .attr('value', 'Submit Task');

                nextStore.isComplete = true;
            }

            nextStore.isVisible = true;
            this.currentStepIndex++;
            setTimeout(() => {
                $('ul.tabs').tabs('select_tab', nextStore.id);
                if (nextStore) {
                    nextStore.start();
                }
            }, 200);
        }
    }

    private _isValid(value: string) {
        return value && value.length > 0;
    }
}
