// Business logic for analytics data aggregation
// Uses Prisma ORM to query the database

const { PrismaClient } = require('@prisma/client');
const cache = require('../utils/cache');
const prisma = new PrismaClient();

/**
 * Get summary statistics
 */
exports.getSummaryStats = async () => {
  // Try cache first
  const cacheKey = 'analytics_summary';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // Example queries (replace table/field names as needed)
  const totalMigrantRegistrations = await prisma.migrant.count();
  const totalVaccinated = await prisma.migrant.count({ where: { vaccinated: true } });
  const newInfections = await prisma.healthRecord.count({ where: { infectionReportedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } });

  const stats = {
    totalMigrantRegistrations,
    totalVaccinated,
    vaccinationCoverage: totalVaccinated / (totalMigrantRegistrations || 1),
    newInfectionsLast30Days: newInfections,
  };

  cache.set(cacheKey, stats, 300); // Cache for 5 min
  return stats;
};

/**
 * Get trends over time/by region
 * @param {Object} options
 */
exports.getTrends = async ({ startDate, endDate, region }) => {
  // Example: Trend of new infections per week, optionally filtered by region
  // Try cache first if no custom filters
  const cacheKey = `analytics_trends_${startDate || ''}_${endDate || ''}_${region || ''}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // Build query
  const where = {};
  if (startDate) where.infectionReportedAt = { gte: new Date(startDate) };
  if (endDate) where.infectionReportedAt = { ...where.infectionReportedAt, lte: new Date(endDate) };
  if (region) where.region = region;

  // Example: group by week
  const trends = await prisma.healthRecord.groupBy({
    by: ['region'],
    where,
    _count: { infectionReportedAt: true },
  });

  cache.set(cacheKey, trends, 300); // Cache for 5 min
  return trends;
};