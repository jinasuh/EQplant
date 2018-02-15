import * as React from 'react';
import { StepStoreBase, IStepStore } from 'src/store/stepStore';
import { Step } from 'src/components/Step';
import { Store } from 'src/round2/store';
import { Introduction } from 'src/round2/Introduction';
import { Tasks } from 'src/round2/Tasks';
import { Survey } from 'src/round2/Survey';

export const renderStep = (stepStore: IStepStore, store: Store) => {
    const { id, canProceed, completeText } = stepStore;
    var children = null;
    switch (stepStore.id) {
        case 'Introduction':
            children = <Introduction />;
            break;
        case 'Tasks':
            children = <Tasks store={store} />;
            break;
        case 'Survey':
            children = <Survey store={store} />;
            break;
    }

    return (
        <div id={id} key={id}>
            <Step canProceed={canProceed} completeText={completeText} onCompleteStep={store.completeCurrentStep}>
                {children}
            </Step>
        </div>
    );
};

export class IntroductionStore extends StepStoreBase {
    constructor() {
        super('Introduction', 'I understand the requirements');
        this.isVisible = true;
        this.canProceed = true;
    }
}

export class TasksStore extends StepStoreBase {
    constructor() {
        super('Tasks', 'I am done with my tasks');
        this.isVisible = true;
        this.canProceed = false;
    }
}

export class SurveyStore extends StepStoreBase {
    constructor() {
        super('Survey', null);
        this.isVisible = true;
        this.canProceed = false;
    }
}

export type StepId = 'Introduction' | 'Survey';
