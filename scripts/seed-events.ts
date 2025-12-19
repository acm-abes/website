import { prisma } from "../src/lib/prisma";
import { events } from "../public/data/events";

async function seedEvents() {
  console.log("Starting to seed events...");

  for (const event of events) {
    try {
      // Check if event already exists
      const existing = await prisma.event.findUnique({
        where: { id: event.id },
      });

      if (existing) {
        console.log(`Event ${event.id} already exists, updating...`);
        await prisma.event.update({
          where: { id: event.id },
          data: event,
        });
      } else {
        console.log(`Creating event ${event.id}...`);
        await prisma.event.create({
          data: event,
        });
      }
    } catch (error) {
      console.error(`Error seeding event ${event.id}:`, error);
    }
  }

  console.log("Finished seeding events!");
}

seedEvents()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
