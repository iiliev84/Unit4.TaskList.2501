import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded. 🌱");

async function seed() {
  const user = await createUser("Ilian", "Levski");
  for (let j = 1; j <= 6; j++) {
    const random = Boolean(Math.round(Math.random()));
    await createTask("Task" + j, random, user.id);
  }
}
