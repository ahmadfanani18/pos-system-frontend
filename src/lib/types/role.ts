export type Role = "ADMIN" | "MANAGER" | "CASHIER";

export const ROLE_HIERARCHY: Record<Role, number> = {
  CASHIER: 1,
  MANAGER: 2,
  ADMIN: 3,
};

export function hasRole(userRole: Role, requiredRole: Role | Role[]): boolean {
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const maxRequired = Math.max(...roles.map((r) => ROLE_HIERARCHY[r]));
  return ROLE_HIERARCHY[userRole] >= maxRequired;
}
