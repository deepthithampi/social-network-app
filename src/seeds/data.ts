const usernames = [
'deepthi123',
'sandy123',
'ava123',
'family123',
'bootcamp123',
];

const thoughTexts = [
'Finished my second project confidently',
'Learned new concepts of Mongo and Mongoose',
'Mongoose makes MongoDB so easy to use',
'I love learning new technologies',
'I love learning in general especially coding',
];

//get a random item from array
export const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

//generat random username
export const getRandonUsername = () => getRandomArrItem(usernames);

//generate a random emailId based on username
export const getRandomEmail = (username : string) => `${username}@example.com`;

//generate a random thought text
