import dotenv from 'dotenv';

dotenv.config();

const required = ['ADMIN_USERNAME', 'ADMIN_PASSWORD'] as const;
for (const key of required) {
  if (!process.env[key]) {
    // Warning if missing variable
    console.warn(`[credentials] Missing environment variable: ${key}`);
  }
}

export const credentials = {
  AdminUsername: process.env.ADMIN_USERNAME ?? '',
  AdminPassword: process.env.ADMIN_PASSWORD ?? '',
};

// Central source of truth for credentials used across the project.
// Keeps types consistent and allows swapping values per environment.