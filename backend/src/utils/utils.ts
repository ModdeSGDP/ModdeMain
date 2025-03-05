import { Request } from 'express';

/**
 * Extracts the user ID from the request object.
 * Assumes that `req.user` is populated by authentication middleware.
 */
export function getUserIdFromRequest(req: Request): string {
  if (!req.user || !req.user['id']) {
    throw new Error('User ID not found in request');
  }
  return req.user['id'];
}
