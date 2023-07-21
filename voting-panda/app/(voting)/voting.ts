"use server";

const votes = {
  barbie: 3,
  oppenheimer: 5,
};

export const getVotes = () => votes;

export const vote = (language: keyof typeof votes) => {
  votes[language] += 1;
  return votes;
};
