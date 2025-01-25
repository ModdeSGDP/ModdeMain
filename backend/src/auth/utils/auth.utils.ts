export function getUserIdFromRequest(req: any): string {
    const user = req.user;
    if (!user || !user.userId) {
      throw new Error('User ID not found in the token.');
    }
    return user.userId;
  }
  