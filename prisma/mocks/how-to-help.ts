import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";


export const howToHelpMock: Prisma.HowToHelpCreateInput[] = [
  {
    title: "Alimento",
    description: "Donate non-perishable food items to support those in need.",
    updatedAt: faker.date.recent({ days: 30 })
  },
  {
    title: "Roupas", 
    description: "Clothing donations help keep people warm and comfortable.",
    updatedAt: faker.date.recent({ days: 30 })
  },
  {
    title: "Moveis",
    description: "Provide furniture to improve living conditions for families.",
    updatedAt: faker.date.recent({ days: 30 })
  },
  {
    title: "Empresa",
    description: "Partner with us as a corporate sponsor to amplify our impact.",
    updatedAt: faker.date.recent({ days: 30 })
  },
  {
    title: "Variedades",
    description: "Contribute various items that can assist in our daily operations.",
    updatedAt: faker.date.recent({ days: 30 })
  }
];