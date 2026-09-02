import { Role } from "./types/role";

export type Permission =
  | "dashboard:view"
  | "pos:access"
  | "transactions:view"
  | "transactions:refund"
  | "products:view"
  | "products:edit"
  | "recipes:view"
  | "recipes:edit"
  | "stock_in:view"
  | "stock_in:create"
  | "stock_out:view"
  | "stock_out:create"
  | "stock_report:view"
  | "stock_request:view"
  | "stock_request:create"
  | "stock_request:approve"
  | "reports:view"
  | "customers:view"
  | "customers:create"
  | "customers:edit"
  | "customers:delete"
  | "loyalty:view"
  | "loyalty:edit"
  | "discounts:view"
  | "discounts:edit"
  | "vouchers:view"
  | "vouchers:edit"
  | "settings:view"
  | "employees:view"
  | "employees:edit";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    "dashboard:view",
    "pos:access",
    "transactions:view",
    "transactions:refund",
    "products:view",
    "products:edit",
    "recipes:view",
    "recipes:edit",
    "stock_in:view",
    "stock_in:create",
    "stock_out:view",
    "stock_out:create",
    "stock_report:view",
    "stock_request:view",
    "stock_request:create",
    "stock_request:approve",
    "reports:view",
    "customers:view",
    "customers:create",
    "customers:edit",
    "customers:delete",
    "loyalty:view",
    "loyalty:edit",
    "discounts:view",
    "discounts:edit",
    "vouchers:view",
    "vouchers:edit",
    "settings:view",
    "employees:view",
    "employees:edit",
  ],
  MANAGER: [
    "dashboard:view",
    "pos:access",
    "transactions:view",
    "transactions:refund",
    "products:view",
    "products:edit",
    "recipes:view",
    "recipes:edit",
    "stock_in:view",
    "stock_in:create",
    "stock_out:view",
    "stock_out:create",
    "stock_report:view",
    "stock_request:view",
    "stock_request:create",
    "stock_request:approve",
    "reports:view",
    "customers:view",
    "customers:create",
    "customers:edit",
    "loyalty:view",
    "loyalty:edit",
    "discounts:view",
    "discounts:edit",
    "vouchers:view",
    "vouchers:edit",
  ],
  CASHIER: [
    "dashboard:view",
    "pos:access",
    "transactions:view",
    "products:view",
    "stock_request:view",
    "stock_request:create",
    "customers:create",
  ],
};

export function can(userRole: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
}

export function canAny(userRole: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => can(userRole, p));
}

export function canAll(userRole: Role, permissions: Permission[]): boolean {
  return permissions.every((p) => can(userRole, p));
}
