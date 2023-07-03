import { privateApi } from "./index";

export const authUserMixin = {
  methods: {
    async getUser() {
      const res = await privateApi.get("/users/me");
      return res;
    },
  },
};
