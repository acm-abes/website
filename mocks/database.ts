import { Quiz } from "@/types";

interface Database {
  quizzes: Quiz[];
  getQuiz: (id: string) => Quiz | undefined;
}

export const database: Database = {
  quizzes: [
    {
      id: "123",
      name: "Test Quiz 1",
      start: new Date("2024-10-07T07:37:00.954Z").toISOString(),
      end: new Date(
        new Date("2024-10-09T00:37:00.954Z").getTime() + 1000 * 60 * 60,
      ).toISOString(),
      description: "A mock quiz",
      questions: [
        {
          title: "What is the largest planet in our solar system?",
          id: "7",
          options: [
            {
              id: "35",
              value: "Earth",
            },
            {
              id: "36",
              value: "Mars",
            },
            {
              id: "37",
              value: "Jupiter",
            },
            {
              id: "38",
              value: "Saturn",
            },
          ],
        },
        {
          title:
            "Which programming language is known for its use in web development?",
          id: "8",
          options: [
            {
              id: "39",
              value: "Python",
            },
            {
              id: "40",
              value: "Java",
            },
            {
              id: "41",
              value: "JavaScript",
            },
            {
              id: "42",
              value: "C++",
            },
          ],
        },
        {
          title: "Which country hosted the 2020 Summer Olympics?",
          id: "9",
          options: [
            {
              id: "43",
              value: "Brazil",
            },
            {
              id: "44",
              value: "Japan",
            },
            {
              id: "45",
              value: "USA",
            },
            {
              id: "46",
              value: "Australia",
            },
          ],
        },
        {
          title: "Which of the following is not a primary color?",
          id: "10",
          options: [
            {
              id: "47",
              value: "Red",
            },
            {
              id: "48",
              value: "Green",
            },
            {
              id: "49",
              value: "Blue",
            },
            {
              id: "50",
              value: "Yellow",
            },
          ],
        },
        {
          title: "Which animal is known as the 'King of the Jungle'?",
          id: "11",
          options: [
            {
              id: "51",
              value: "Elephant",
            },
            {
              id: "52",
              value: "Tiger",
            },
            {
              id: "53",
              value: "Lion",
            },
            {
              id: "54",
              value: "Leopard",
            },
          ],
        },
      ],
    },
  ],

  getQuiz: function (id: string) {
    return this.quizzes.find((quiz) => quiz.id === id);
  },
};
