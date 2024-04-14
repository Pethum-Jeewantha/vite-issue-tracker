import createAsyncApiAction from "../../../lib/asyncApi.lib.ts";

export const fetchAll = createAsyncApiAction("application", "fetchAll", "get");
