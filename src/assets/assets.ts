import { TreatmentType } from 'src/store';

const assets: any = {
    anger1_control: 'https://drive.google.com/open?id=1kN_9p8s5-j518TWjNDTuI35qZ2N5ZNqL',
    anger1_treatment: 'https://drive.google.com/open?id=1sbw8_Ck2h4A6l-lymaCyxT3EM7NrL3eu',
    anger2_control: 'https://drive.google.com/open?id=1XrawTtdbP7cr9oG6-FZM6AV3fgMlzF3n',
    anger2_treatment: 'https://drive.google.com/open?id=1uMoupOqES7I6ccFZx2w12SmFBBP316d3',
    anger3_control: 'https://drive.google.com/open?id=17SutkaKHIOYGKvPNYQvySqPocBeY-N7D',
    anger3_treatment: 'https://drive.google.com/open?id=1rlE_2YDwVN_444troXV-mCCohD4oeSUa'
};

export const getAsset = (conversationId: string, treatmentType: TreatmentType) => {
    var key = 'unknown';
    switch (treatmentType) {
        case TreatmentType.None:
            key = `${conversationId}_control`;
        case TreatmentType.Default:
            key = `${conversationId}_treatment`;
    }
    return assets[key];
};
