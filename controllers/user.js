import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function userController() {

    // const newUser = await prisma.user.create({
    //   data: {
    //     email: "hello@herewecode.io",
    //     username: "gaelgthomas",
    //   },
    // });
  
    // console.log("New User:");
    // console.log(newUser);
  
    // const firstTweet = await prisma.tweet.create({
    //   data: {
    //     text: "Hello world!",
    //     userId: newUser.id,
    //   },
    // });
  
    // console.log("First tweet:");
    // console.log(firstTweet);
  
    // We fetch the new user again (by its unique email address)
    // and we ask to fetch its tweets at the same time
    const newUserWithTweets = await prisma.user.findUnique({
      where: {
        email: "hello@herewecode.io",
      },
      include: { tweets: true },
    });
  
    console.log("User object with Tweets:");
    console.dir(newUserWithTweets);

    return {newUserWithTweets, prisma}
}

export async function createUser(userData) {
    console.log(userData, 'USERDATA');
  const {email, username} = JSON.parse(userData);
  const user = await prisma.user.create({
      data: {
        email,
        username,
      },
    });
    
    return {user, prisma}

}

export async function getUserByEmail({email}) {
    console.log(email, 'EMAIL');
    const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: { tweets: true },
      });
    
    return {user, prisma}
}

export async function getAllUsers() {
 
    const users = await prisma.user.findMany(
        // { include: { tweets: true }}
    )
    
    return {users, prisma}
}

