import { action, computed, observable, reaction } from 'mobx';
import { IAssignment, TreatmentType } from 'src/store';
import { IStepStore } from 'src/store/stepStore';
import { IntroductionStore, SurveyStore } from 'src/round2/steps';

export type DataId = 'responses' | 'empathyRatings' | 'gender' | 'age' | 'literacy' | 'comment';

export interface IStudyInput extends IAssignment {
    conversationIds: string[];
    treatmentTypes: TreatmentType[];
}

export type StudyInputData = {
    conversationIds: string;
    treatmentTypes: string;
};

export type StudyInputId = keyof StudyInputData;

export const studySetting = {
    compensation: '$1.00',
    duration: 'about 15 minutes'
};

export const defaultStudyInputData = <StudyInputData>{
    treatmentTypes: '[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]',
    conversationIds: '[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]'
};

export interface IStoreProps {
    store: Store;
}

export class Store {
    public readonly accepted: boolean = false;

    public readonly studyInput: IStudyInput;

    public readonly steps: IStepStore[] = [];

    @observable public responses: { [conversationId: string]: string } = {};
    @observable public empathyRatings: { [conversationId: string]: string } = {};
    @observable public gender: string;
    @observable public age: string;
    @observable public literacy: string;
    @observable public comment: string;

    @observable public currentIndex: number = 0;
    @observable public currentStepIndex: number = 0;

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

        this.studyInput = <IStudyInput>{
            assignmentId,
            hitId: queryParams['hitId'],
            workerId: queryParams['workerId'],
            conversationIds: JSON.parse(data.conversationIds),
            treatmentTypes: JSON.parse(data.treatmentTypes)
        };

        reaction(
            () => this.canSubmitResponseTask,
            canSubmit => {
                $('#submitButton')
                    .prop('disabled', !canSubmit)
                    .attr('value', 'Submit Task');
            }
        );

        const introStore = new IntroductionStore();
        const surveyStore = new SurveyStore();

        this.steps.push(introStore);
        this.steps.push(surveyStore);
    }

    @computed
    public get currentConversationId(): string {
        return this.studyInput.conversationIds[this.currentIndex];
    }

    @computed
    public get currentTreatmentType(): TreatmentType {
        return this.studyInput.treatmentTypes[this.currentIndex];
    }

    @computed
    public get canSubmitResponseTask() {
        return (
            Object.keys(this.responses).length === 15 &&
            this._isValid(this.gender) &&
            this._isValid(this.age) &&
            this._isValid(this.literacy)
        );
    }

    @action.bound
    public addData(key: DataId, data: string) {
        this[key] = data;
    }

    @action.bound
    public addResponse(conversationId: string, response: string) {
        this.responses[conversationId] = response;
        this.currentIndex++;
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
