export class Question {
    questionID: string;
    skillID: string;
    title: string;
    content: string;
    status: string;
    userID: string;
    userName: string;
    upvote: number;
    upvoteBy: any;
    createdAt: string;
    updatedAt: string;
    answers: Answer[];
    showReplies: boolean;
    reply: boolean;

    constructor(data: any) {
        this.questionID = data.questionID;
        this.skillID = data.skillID;
        this.title = data.title;
        this.content = data.content;
        this.status = data.status;
        this.userID = data.userID;
        this.userName = data.userName;
        this.upvote = data.upvote;
        this.upvoteBy = data.upvoteBy;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.answers = data.answers.map((answer: any) => new Answer(answer));
        this.showReplies = data.showReplies;
        this.reply = data.reply;
    }
}

export class Answer {
    answerID: string;
    questionID: string;
    content: string;
    userID: string;
    userName: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: any) {
        this.answerID = data.answerID;
        this.questionID = data.questionID;
        this.content = data.content;
        this.userID = data.userID;
        this.userName = data.userName;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
