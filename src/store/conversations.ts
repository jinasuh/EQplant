export interface IMessage {
    received: boolean;
    content: string;
}

export interface IConversation {
    id: number;
    messages: IMessage[];
    from: string;
    to: string;
    anger: boolean;
    highConfidence: boolean;
}

export const getConversation = (conversationId: number) => {
    return conversations.filter(conv => conv.id === conversationId)[0];
};

const conversations: IConversation[] = [
    {
        id: 1,
        from: 'Kelsey',
        to: 'Alex',
        anger: true,
        highConfidence: true,
        messages: [
            {
                received: false,
                content: 'Hey babe, we’re talking about doing drinks after work. How’s everything at home?'
            },
            {
                received: true,
                content: 'Ok.'
            },
            {
                received: true,
                content: "I'm"
            },
            {
                received: true,
                content: 'The house is a warzone. Consider yourself warned.'
            }
        ]
    },
    {
        id: 2,
        from: 'Mom',
        to: 'Alex',
        anger: true,
        highConfidence: true,
        messages: [
            {
                received: true,
                content: 'Did you forget to take out the trash?'
            },
            {
                received: false,
                content: 'oops'
            },
            {
                received: true,
                content: 'There are ants all over your kitchen! I didn’t raise you to be like this'
            }
        ]
    },
    {
        id: 3,
        from: 'Lisa',
        to: 'Alex',
        anger: true,
        highConfidence: true,
        messages: [
            {
                received: true,
                content: 'srsly why do i even stick with this job'
            },
            {
                received: false,
                content: 'ur boss again?'
            },
            {
                received: true,
                content: 'nobody grinds my gears like he does!!!'
            }
        ]
    },
    {
        id: 4,
        from: 'John',
        to: 'Alex',
        anger: true,
        highConfidence: true,
        messages: [
            {
                received: true,
                content: 'Did you tell Jane about me drinking last night?'
            },
            {
                received: false,
                content: 'What? You mean she found out?'
            },
            {
                received: true,
                content: 'SOMEONE told her. Shit. she’s pissed. I’m pissed at whoevr told her'
            }
        ]
    },
    {
        id: 5,
        from: 'Teri',
        to: 'Alex',
        anger: true,
        highConfidence: true,
        messages: [
            {
                received: true,
                content: 'Did you know that Dave was planning to break up with me on Valentine’s Day?'
            },
            {
                received: false,
                content: 'Omg im so sorry'
            },
            {
                received: true,
                content: 'That asshole! I found out accidentally but now i don’t know what i wanna do'
            }
        ]
    },
    {
        id: 6,
        from: 'Jess',
        to: 'Alex',
        anger: true,
        highConfidence: false,
        messages: [
            {
                received: false,
                content: 'I just walked past someone who dressed like you at the Starbucks by work'
            },
            {
                received: true,
                content: 'Wow, stalker'
            },
            {
                received: false,
                content: 'It was you?! I thought you gave up coffee because of your diet thing'
            },
            {
                received: true,
                content: "i couldn't keep up with it ok? forgive my sins"
            }
        ]
    },
    {
        id: 7,
        from: 'Paula',
        to: 'Alex',
        anger: true,
        highConfidence: false,
        messages: [
            {
                received: false,
                content: 'Did you just hear about the layoffs?'
            },
            {
                received: true,
                content:
                    'I didn’t JUST hear about it. I heard about it first thing this morning, because I got laid off. Looks like you got lucky.'
            }
        ]
    },
    {
        id: 8,
        from: 'Sarah',
        to: 'Alex',
        anger: true,
        highConfidence: false,
        messages: [
            {
                received: false,
                content: 'Um, i accidentally took a nap'
            },
            {
                received: true,
                content: 'K.'
            },
            {
                received: false,
                content: 'Leaving now. Think i should uber or take the bus?'
            },
            {
                received: true,
                content: 'K.'
            }
        ]
    },
    {
        id: 9,
        from: 'Jeremy',
        to: 'Alex',
        anger: true,
        highConfidence: false,
        messages: [
            {
                received: true,
                content: "I need some help"
            },
            {
                received: true,
                content: "Hello? Can I get some help please??"
            }
        ]
    },
    {
        id: 10,
        from: 'Juliet',
        to: 'Alex',
        anger: true,
        highConfidence: false,
        messages: [
            {
                received: true,
                content: 'pro tip do not forget umbrellas on rainy days'
            },
            {
                received: false,
                content: 'oh no... are you all drenched?'
            },
            {
                received: true,
                content: 'mostly because a car sped by and there happened to be a puddle. ugh!'
            }
        ]
    },
    {
        id: 11,
        from: 'David',
        to: 'Alex',
        anger: false,
        highConfidence: true,
        messages: [
            {
                received: false,
                content: 'Sorry man, this is taking super long. You can start without me if you want'
            },
            {
                received: true,
                content: 'What the fuck dude'
            },
            {
                received: false,
                content: 'I said I’m sorry lol you can chill for liek 5 minutes i’ll be there with the chicken nuggets'
            },
            {
                received: true,
                content: 'They’d better not get cold :P'
            }
        ]
    },
    {
        id: 12,
        from: 'Ruby',
        to: 'Alex',
        anger: false,
        highConfidence: false,
        messages: [
            {
                received: true,
                content: 'Are we still on for tonight?'
            },
            {
                received: false,
                content: 'Idk. feeling not very sociable right now'
            },
            {
                received: true,
                content: 'You did this last week too! What’s going on really? Are you okay?'
            }
        ]
    },
    {
        id: 13,
        from: 'Joey',
        to: 'Alex',
        anger: false,
        highConfidence: false,
        messages: [
            {
                received: false,
                content: 'Did you see my email?'
            },
            {
                received: true,
                content: 'No. What did you say?'
            },
            {
                received: false,
                content: "I couldn't get enough tickets for all of us but only got three"
            },
            {
                received: true,
                content: "That's a problem"
            }
        ]
    },
    {
        id: 14,
        from: 'Fei',
        to: 'Alex',
        anger: false,
        highConfidence: true,
        messages: [
            {
                received: true,
                content: "Can you call me when you have a moment? I need to ask your opinion on something"
            },
            {
                received: false,
                content: 'Is 2pm okay? I can step out of this if you need'
            },
            {
                received: true,
                content: 'No problem :)'
            }
        ]
    },
    {
        id: 15,
        from: 'Arjun',
        to: 'Alex',
        anger: false,
        highConfidence: true,
        messages: [
            {
                received: true,
                content: 'Sorry about yesterday. I had no idea where I left my wallet'
            },
            {
                received: false,
                content: 'Did you find it yet? Also no worries, yesterday was on me'
            },
            {
                received: true,
                content: 'Still looking, but I canceled my credit cards'
            }
        ]
    }
];
