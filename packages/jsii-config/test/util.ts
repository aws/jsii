export const findQuestion = (key: string, questions: any[]) => questions.find((question: any) => question.name === key);

export const findQuestions = (keys: string[], question: any[]) => keys.map(key => findQuestion(key, question));
