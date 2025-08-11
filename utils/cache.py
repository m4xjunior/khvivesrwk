

import redis
from config import Config

# Create Redis connection pool
redis_pool = redis.ConnectionPool.from_url(Config.REDIS_URL)
cache = redis.Redis(connection_pool=redis_pool)

def get_cache():
    """Return the Redis cache instance"""
    return cache

