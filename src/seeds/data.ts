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

export const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];