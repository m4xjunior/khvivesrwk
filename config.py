

import os

class Config:
    # Flask settings
    PORT = int(os.environ.get('BACKEND_PORT', 5005))
    
    # JWT settings
    JWT_SECRET = os.environ['JWT_SECRET']
    
    # API endpoints
    FORD_API_URL = os.environ.get('FORD_API_URL', 'http://178.79.173.223/ford/')
    ENTORNO_URL = os.environ['ENTORNO_URL']
    
    # Redis settings
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
    CACHE_TTL = 300  # 5 minutes in seconds

