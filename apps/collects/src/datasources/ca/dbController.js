import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllTicketRequestCa() {
  try {
    const response = await prisma.call_req.findMany({
      take: 100,
      orderBy: {
        open_date: "desc"
      }
    });

    const results = response.map((item) => {
      return {
        ...item,
        zmain_tech: convertHexToString(item.zmain_tech),
        requested_by: convertHexToString(item.requested_by)
      };
    });

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

function convertHexToString(hexValue) {
  return hexValue && `0x${Buffer.from(hexValue).toString("hex").toUpperCase()}`;
}
