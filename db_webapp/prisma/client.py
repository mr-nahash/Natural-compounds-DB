import os
from prisma import PrismaClient

# Check the environment
if "NODE_ENV" in os.environ and os.environ["NODE_ENV"] == "production":
    prisma = PrismaClient()
else:
    # Use a global PrismaClient instance if not in production
    if not hasattr(globals(), "prisma"):
        globals()["prisma"] = PrismaClient()

    prisma = globals()["prisma"]

# Export the Prisma client
exported_prisma = prisma
