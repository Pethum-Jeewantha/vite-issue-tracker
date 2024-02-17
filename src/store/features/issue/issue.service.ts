import createAsyncApiAction from "../../../lib/asyncApi.lib.ts";

export const fetchAll = createAsyncApiAction("issue", "fetchAll", "get");
export const create = createAsyncApiAction("issue", "create", "post");
export const remove = createAsyncApiAction("issue", "delete", "delete");
export const update = createAsyncApiAction("issue", "update", "put");
export const patch = createAsyncApiAction("issue", "path", "patch");
