


import httpx
import tenacity
import pybreaker
from config import Config
from utils.cache import cache

class EntornoService:
    _breaker = pybreaker.CircuitBreaker(fail_max=5, reset_timeout=60)
    
    def __init__(self):
        self.base_url = Config.ENTORNO_URL
        self.cache = cache
        self.cache_prefix = "entorno:"
    
    @tenacity.retry(
        stop=tenacity.stop_after_attempt(3),
        wait=tenacity.wait_exponential(multiplier=1, min=1, max=10),
        retry=tenacity.retry_if_exception_type(httpx.RequestError)
    )
    async def _make_request(self, endpoint: str, params: dict = None):
        url = f"{self.base_url}{endpoint}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
    
    @_breaker
    async def get_campaigns(self, vin: str):
        cache_key = f"{self.cache_prefix}{vin}"
        if campaigns := self.cache.get(cache_key):
            return campaigns
        
        try:
            data = await self._make_request("camp.php", {"vin": vin})
            campaigns = self._map_campaigns(data)
            self.cache.set(cache_key, campaigns, ex=Config.CACHE_TTL)
            return campaigns
        except Exception as e:
            raise EntornoServiceError(f"Failed to fetch campaigns: {str(e)}")
    
    def _map_campaigns(self, data: dict) -> list:
        # Map API response to internal structure
        return [{
            "id": item["vin_id"],
            "name": item["camp_name"],
            "description": item.get("description", ""),
            "status": self._map_status(item["status"])
        } for item in data.get("campaigns", [])]
    
    def _map_status(self, status_str: str) -> int:
        # Map status string to numeric code
        status_map = {"OK": 1, "OKR": 2, "NOK": 10}
        return status_map.get(status_str.upper(), 0)
    
    async def submit_validation(self, vin_id: str, status: int, observations: str):
        try:
            data = {
                "vin_id": vin_id,
                "status": status,
                "observations": observations
            }
            response = await self._make_request("crear.php", data)
            return response.get("success", False)
        except Exception as e:
            raise EntornoServiceError(f"Validation submission failed: {str(e)}")

class EntornoServiceError(Exception):
    pass


