import spark from 'spark';

const ACCESS_TOKEN = process.env.PARTICLE_ACCESS_TOKEN || "access_token";

// Login
spark.login({ accessToken: ACCESS_TOKEN });

// Export
export default spark;
