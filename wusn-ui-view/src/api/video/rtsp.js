import { get, post } from '@/util/http';

export function exists(id) {
  return get(`/video/rtsp/${id}/exists`);
}

export function inspect(id) {
  return get(`/video/rtsp/${id}/get`);
}

export function insert(form) {
  return post('/video/rtsp/insert', form);
}

export function update(form) {
  return post('/video/rtsp/update', form);
}

export function remove(id) {
  return get(`/video/rtsp/${id}/delete`);
}

export function lookup(page, rows) {
  return get('/video/rtsp/lookup', {
    page,
    rows,
  });
}
