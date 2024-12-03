"use server";

import { revalidatePath } from "next/cache";
import { Client, Databases, ID, Query } from "node-appwrite";

export async function getConfessions() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!);

  const databases = new Databases(client);

  const confessions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE!,
    process.env.APPWRITE_COLLECTION!,
    [Query.orderDesc("$createdAt")]
  );

  return confessions.documents;
}

export async function createConfession(
  name: string,
  weapon: string,
  confession: string
) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!);

  const databases = new Databases(client);

  // delay for 10 seconds
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const result = await databases.createDocument(
    process.env.APPWRITE_DATABASE!,
    process.env.APPWRITE_COLLECTION!,
    ID.unique(),
    {
      name,
      weapon,
      confession,
    }
  );

  revalidatePath("/");

  return result.$id ? true : false;
}

export async function searchConfessions(query: string) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!);

  const databases = new Databases(client);

  const confessions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE!,
    process.env.APPWRITE_COLLECTION!,
    [
      Query.or([
        Query.search("name", query),
        Query.search("confession", query),
      ]),
      Query.orderDesc("$createdAt"),
    ]
  );

  return confessions.documents;
}

export async function filterConfessions(weapon: string) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!);

  const databases = new Databases(client);

  // delay for 10 seconds
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const confessions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE!,
    process.env.APPWRITE_COLLECTION!,
    [Query.equal("weapon", weapon), Query.orderDesc("$createdAt")]
  );

  return confessions.documents;
}
