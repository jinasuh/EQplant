export interface IOption {
    id: string;
    text: string;
}

export interface IQuestion {
    question: string;
    options: IOption[];
    name: string;
}

const agreementOptions: IOption[] = [
    { id: 'strongagree', text: 'Strongly agree' },
    { id: 'agree', text: 'Agree' },
    { id: 'neutral', text: 'Neutral' },
    { id: 'disagree', text: 'Disagree' },
    { id: 'strongdisagree', text: 'Strongly disagree' }
];

export const perceptionQuestions: IQuestion[] = [
    {
        question: 'I understand what the emotion assistance bases its recommendation on.',
        name: 'transparency',
        options: agreementOptions
    },
    {
        question: 'I think the emotion assistance accurately describes the emotion in the text messages.',
        name: 'accuracy',
        options: agreementOptions
    },
    {
        question: 'The next time I am chatting with someone, I would like to use the emotion assistance.',
        name: 'intentuse',
        options: agreementOptions
    },
    {
        question: 'I trust the emotion assistance.',
        name: 'trust',
        options: agreementOptions
    },
    {
        question: 'I found the emotion assistance to be useful.',
        name: 'useful',
        options: agreementOptions
    },
    {
        question: 'I think the emotion assistance should give an explanation for its suggestions.',
        name: 'explanation',
        options: agreementOptions
    },
    {
        question: 'I think the emotion assistance did not get in the way of the text messaging.',
        name: 'discreet',
        options: agreementOptions
    },
    {
        question: 'I think the emotion assistance helped me respond to the messages faster.',
        name: 'efficiency',
        options: agreementOptions
    },
    {
        question: 'I think the emotion assistance helped me respond to the messages more appropriately.',
        name: 'effectiveness',
        options: agreementOptions
    },
    {
        question: 'I am satisfied with the emotion assistance.',
        name: 'satisfaction',
        options: agreementOptions
    }
];

export const getEmpathyQuestion = (from: string, to: string) => {
    return {
        question: `Given the conversation, how much empathy is shown in ${to}'s response to ${from}?`,
        name: 'empathy',
        options: [
            { id: 'none', text: 'Not at all' },
            { id: 'slightly', text: 'Slightly' },
            { id: 'moderately', text: 'Moderately' },
            { id: 'very', text: 'Very' },
            { id: 'extremely', text: 'Extremely' }
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
