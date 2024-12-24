export const sessions = {
  list: {},
  remove(hash) {
    if (this.list) {
      delete this.list[hash];
    }
  },
  create(user) {
    const hash = Math.random().toFixed(40);

    this.list[hash] = user;
    return hash;
  },

  access(hash, accesRoles) {
    if (this.list) {
      const user = this.list[hash];
      return !!user && accesRoles.includes(user.roleId);
    }
    return false;
  },
};
