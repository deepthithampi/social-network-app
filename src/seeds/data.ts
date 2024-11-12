const usernames = [
'deepthi123',
'sandy123',
'ava123',
'family123',
'bootcamp123',
];

const thoughtTexts = [
'Finished my second project confidently',
'Learned new concepts of Mongo and Mongoose',
'Mongoose makes MongoDB so easy to use',
'I love learning new technologies',
'I love learning in general especially coding',
];

//flag tracking for testing 
let allUsernamesUsed = false;

//get a random item from array
export const getRandomArrItem = (arr: any[]) => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  // console.log(`Randomly selected item: ${item}`);
  return item;
};

const usedUsernames = new Set<string>();
//generat random username which are unique
export const getRandonUsername = () => {
  let username;

   // Check if we've used all usernames already
   if (usedUsernames.size >= usernames.length) {
    allUsernamesUsed = true;
  }
  
  do {
    username = getRandomArrItem(usernames);
    console.log(`Attempting to select username: ${username}`);
  } while (!allUsernamesUsed && usedUsernames.has(username));

  // Add to the set only if we haven't used all usernames yet
  if (!allUsernamesUsed) {
    usedUsernames.add(username);
  }
  console.log(`Selected username: ${username}`);
  return username;
}
  //getRandomArrItem(usernames);

//generate a random emailId based on username
export const getRandomEmail = (username : string) => `${username}@example.com`;

//generate a random thought text -> use the getRandomArrItem to get a random thouhgt
export const getRandomThought = () => {
  const thoughtText = getRandomArrItem(thoughtTexts);
  console.log(`Selected thought text: ${thoughtText}`);
  return thoughtText;
};

//generate random reactions (for Thought model)
export const getRandomReactions = (numReactions: number): { reactionBody: string; username: string; createdAt: Date }[] => {
  console.log("Entering getRandomReactions function...");
  
  const reactions = [];
  try {
    for (let i = 0; i < numReactions; i++) {
      console.log(`Creating reaction ${i + 1} of ${numReactions}...`);

      const reactionBody = getRandomThought(); // Random thought for reaction body
      const username = getRandonUsername();    // Random username
      const createdAt = new Date();

      reactions.push({ reactionBody, username, createdAt });
      console.log(`Reaction ${i + 1}:`, { reactionBody, username, createdAt });
    }
  } catch (error) {
    console.error("Error in getRandomReactions function:", error);
  }

  console.log("Completed reactions array:", reactions);
  return reactions;
};