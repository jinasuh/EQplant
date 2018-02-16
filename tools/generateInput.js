const all = Array(15)
    .fill()
    .map((x, i) => i + 1);
const angry = Array(10)
    .fill()
    .map((x, i) => i + 1);
const notAngry = Array(5)
    .fill()
    .map((x, i) => i + 11);
const precisions = Array(4)
    .fill()
    .map((x, i) => (i + 6) / 10);

function copyAndShuffle(a) {
    const copy = a.slice();
    var j, x, i;
    for (i = copy.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = copy[i];
        copy[i] = copy[j];
        copy[j] = x;
    }

    return copy;
}

function printRound1() {
    console.log(`Round 1 Part 1`);
    console.log('TaskType,TreatmentType,ConversationId');

    angry.forEach(id => {
        console.log(`0,0,${id}`);
        console.log(`0,1,${id}`);
    });
}

function printRound2() {
    console.log(`Round 2 Part 1`);
    console.log('TaskType,Precision,TreatmentTypes,ConversationIds');

    const shuffledAngry = copyAndShuffle(angry);
    const shuffledNotAngry = copyAndShuffle(notAngry);

    for (i = 0; i < 10; i++) {
        precisions.forEach(precision => {
            const angryCount = Math.round(precision * angry.length);
            const notAngryCount = angry.length - angryCount;

            const treatments = shuffledAngry.slice(0, angryCount).concat(shuffledNotAngry.slice(0, notAngryCount));

            // Shuffle conversations
            const conversationIds = copyAndShuffle(all);
            const treatmentTypes = conversationIds.map(cid => {
                return treatments.indexOf(cid) >= 0 ? 1 : 0;
            });

            console.log(`0,${precision},"${JSON.stringify(treatmentTypes)}","${JSON.stringify(conversationIds)}"`);
        });
    }
}

function printRound3() {
    console.log(`Round 3 Part 1`);
    console.log('TaskType,Confidence,TreatmentTypes,ConversationIds');

    const shuffledAngry = copyAndShuffle(angry);
    const shuffledNotAngry = copyAndShuffle(notAngry);

    for (i = 0; i < 10; i++) {
        // all default treatment
        let conversationIds = copyAndShuffle(all);
        let treatmentTypes = conversationIds.map(cid => (cid <= 10 ? 1 : 0));
        console.log(`0,Default,"${JSON.stringify(treatmentTypes)}","${JSON.stringify(conversationIds)}"`);

        // high/low treatment
        conversationIds = copyAndShuffle(all);
        treatmentTypes = conversationIds.map(cid => (cid <= 5 ? 2 : cid <= 10 ? 3 : 0));
        console.log(`0,HighLow,"${JSON.stringify(treatmentTypes)}","${JSON.stringify(conversationIds)}"`);

        // high-only treatment
        conversationIds = copyAndShuffle(all);
        treatmentTypes = conversationIds.map(cid => (cid <= 5 ? 2 : 0));
        console.log(`0,HighOnly,"${JSON.stringify(treatmentTypes)}","${JSON.stringify(conversationIds)}"`);
    }
}

printRound1();
printRound2();
printRound3();
