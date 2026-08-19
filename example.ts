export {};

const badsignUser = (user: any) => (user.isSigned = true);
const oksignUser = (user: any) => ({ name: "ondra", new: "necum" });

const foo = {
  id: 12,
  name: "jarda",
  isSigned: false,
};

const res1 = badsignUser(foo);
res1;
const res = oksignUser(foo);
res;
const res2 = oksignUser(foo) === foo;
res2;
