export type todo = {
    id?: number;
    title: string;
    completed: boolean;
    userId?: number;
    user?: user;
    createdAt?: Date;
    updatedAt?: Date;
};

export type user = {
    id?: number,
    username: string,
    email: string,
    todos?: todo[]
} | null;



// model User {
//   id        Int @id @default (autoincrement())
//   username  String @unique
//   email     String @unique
//   todos     Todo[]
// }

// model Todo {
//   id        Int @id @default (autoincrement())
//   title     String
//   completed Boolean @default (false)
//   userId    Int
//   user      User @relation(fields: [userId], references: [id])
//   createdAt DateTime @default (now())
//   updatedAt DateTime @updatedAt
// }
