import { get, post } from '@/util/http';
import { clone } from '@/util/objects';

export function login(form) {
  return post('/acckeeper/account/login', form);
}

export function logout(form) {
  return post('/acckeeper/account/logout', form);
}

export function isLogin(form) {
  return post('/acckeeper/account/isLogin', form);
}

export function postpone(form) {
  return post('/acckeeper/account/postpone', form);
}

export function register(form) {
  return post('/acckeeper/account/register', form);
}

export function update(form) {
  const result = clone(form, true);
  result.account_key = {};
  result.account_key.string_id = form.key.string_id;
  return post('/acckeeper/account/update', result);
}

export function lookupAccount(page, rows) {
  return get('/acckeeper/account/lookup', {
    page,
    rows,
  });
}

export function updatePassword(form) {
  return post('/acckeeper/account/update-password', form);
}

export function resetPassword(form) {
  return post('/acckeeper/account/reset-password', form);
}

export function myPermissions() {
  return get('/rbac/permission/my-permissions', {});
}

export function permissions(page, rows) {
  return get('/rbac/permission/lookup', {
    page,
    rows,
  });
}

export function resetPermissions(roleId, newPermissions) {
  return post(`/rbac/pexp/${roleId}/reset`, newPermissions);
}

export function lookupPermissionsForRole(roleId) {
  return get(`/rbac/permission/${roleId}/lookup-for-role`, {});
}
