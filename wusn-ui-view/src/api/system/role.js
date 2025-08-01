import { get, post } from '@/util/http';

export function insert(form) {
  return post('/rbac/role/insert', form);
}

export function update(form) {
  return post('/rbac/role/update', form);
}

export function remove(id) {
  return get(`/rbac/role/${id}/delete`);
}

export function lookup(page, rows) {
  return get('/rbac/role/lookup', {
    page,
    rows,
  });
}

export function childForUser(userId) {
  return get(`/rbac/role/${userId}/child-for-user`);
}

export function relation(userId, roles) {
  return post(`/rbac/role/${userId}/relation`, roles);
}
