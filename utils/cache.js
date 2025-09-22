// Simple in-memory cache with TTL

const cacheStore = {};

/**
 * Set value in cache with TTL (seconds)
 */
function set(key, value, ttl = 60) {
  const expires = Date.now() + ttl * 1000;
  cacheStore[key] = { value, expires };
}

/**
 * Get value from cache (returns undefined if not found or expired)
 */
function get(key) {
  const entry = cacheStore[key];
  if (!entry) return undefined;
  if (Date.now() > entry.expires) {
    delete cacheStore[key];
    return undefined;
  }
  return entry.value;
}

module.exports = { set, get };