export interface IOption {
    id: string;
    text: string;
}

export interface IQuestion {
    question: string;
    options: IOption[];
    name: string;
}

export const getEmpathyQuestion = (from: string, to: string) => {
    return {
        question: `Given the conversation, how empathetic was ${to} response to ${from}?`,
        name: 'empathy',
        options: [
            { id: 'none', text: 'Not empathetic at all' },
            { id: 'slightly', text: 'Slightly empathetic' },
            { id: 'moderate', text: 'Moderately empathetic' },
            { id: 'very', text: 'Very empathetic' },
            { id: 'absolutely', text: 'Extremely empathetic' }
        ]
    };
};

export const demographicQuestions: IQuestion[] = [
    {
        question: 'What is your gender?',
        options: [
            { id: 'male', text: 'Male' },
            { id: 'female', text: 'Female' },
            { id: 'other', text: 'Other' },
            { id: 'gender-na', text: 'Prefer not to specify' }
        ],
        name: 'gender'
    },
    {
        question: 'What is your age?',
        options: [
            { id: '18-25', text: '18-25' },
            { id: '26-35', text: '26-35' },
            { id: '36-45', text: '36-45' },
            { id: '46-55', text: '46-55' },
            { id: '56-65', text: '56-65' },
            { id: '66-75', text: '66-75' },
            { id: 'age-na', text: 'Prefer not to specify' }
        ],
        name: 'age'
    },
    {
        question: 'What is your level of English proficiency?',
        options: [
            { id: 'none', text: 'No proficiency' },
            { id: 'elementary', text: 'Elementary proficiency' },
            { id: 'limited', text: 'Limited working proficiency' },
            { id: 'profession', text: 'Professional working proficiency' },
            { id: 'native', text: 'Native or bilingual proficiency' }
        ],
        name: 'literacy'
    }
];
