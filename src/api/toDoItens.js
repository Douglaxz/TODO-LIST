import { privateApi } from "./index";

export const toDoListsItemsApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/items");
    },
    async addListItem(payload) {
      const res = await privateApi.post("/items/new", payload);
      return res;
    },
    async viewListItem(id) {
      const res = await privateApi.get(`/lists/${id}`);
      return res;
    },
    async delListItem(id) {
      const res = await privateApi.delete(`items/${id}`);
      return res;
    },
    async uptListItem(id, payload) {
      const res = await privateApi.patch(`/items/${id}`, payload);
      return res;
    },
  },
};
