import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllTicketRequest() {
  try {
    const users = await prisma.db_ca_req.findMany();
    console.log(users);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }
}
