import { privateApi } from "./index";

export const toDoListsApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async register(payload) {
      const res = await privateApi.post("/lists/new", payload);
      return res;
    },
    async details(id) {
      const res = await privateApi.get(`lists/${id}`);
      return res;
    },
    async delete(id) {
      const res = await privateApi.delete(`lists/${id}`);
      return res;
    },
    async uptItem(id, payload) {
      const res = await privateApi.patch(`/lists/${id}` , payload);
      return res;
    },
  },
};
