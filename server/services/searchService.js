// Business logic to search health records and users.
// Supports filters and pagination.

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Search records/users with filters and pagination.
 * @param {Object} filters
 * @param {Object} pagination
 */
exports.searchRecords = async (filters, pagination) => {
  const { name, disease, location, startDate, endDate } = filters;
  const { page, pageSize } = pagination;

  // Build Prisma query
  const where = {};

  if (name) where.name = { contains: name, mode: 'insensitive' };
  if (disease) where.disease = { contains: disease, mode: 'insensitive' };
  if (location) where.location = { contains: location, mode: 'insensitive' };
  if (startDate || endDate) where.date = {};
  if (startDate) where.date.gte = new Date(startDate);
  if (endDate) where.date.lte = new Date(endDate);

  // Pagination
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [total, items] = await Promise.all([
    prisma.healthRecord.count({ where }),
    prisma.healthRecord.findMany({
      where,
      skip,
      take,
      orderBy: { date: 'desc' },
    }),
  ]);

  return { total, items };
};