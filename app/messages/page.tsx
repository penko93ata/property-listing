import prisma from "@/lib/db";
import { getSessionUser } from "../actions/getSessionUser";

export default async function MessagesPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const readMessages = await prisma.messages.findMany({
    where: {
      recipient: sessionUser.userId,
      read: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    // include: {
    //     user_sender: true,
    // }
  });

  const unreadMessages = await prisma.messages.findMany({
    where: {
      recipient: sessionUser.userId,
      read: false,
    },
    orderBy: {
      createdAt: "asc",
    },
    // include: {
    //     user_sender: true,
    // }
  });

  const messages = [...unreadMessages, ...readMessages];

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounder-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          <div className='space-y-4'>
            {messages.length === 0 ? <p>You have no messages</p> : messages.map((message) => <h3 key={message.id}>{message.name}</h3>)}
          </div>
        </div>
      </div>
    </section>
  );
}
