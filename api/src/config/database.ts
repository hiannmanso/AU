import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('Postgres database connected.');
export default prisma;
