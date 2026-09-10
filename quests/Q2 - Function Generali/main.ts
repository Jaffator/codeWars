function messageSort_1(
  stringArray: string[],
  stringTuple: readonly string[],
  ignore_case?: boolean,
  sort_default?: boolean,
) {
  let result: string[] = [];
  stringArray.forEach((item) => {
    stringTuple.forEach((searchParam) => {
      if (ignore_case) {
        if (item.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase())) {
          result.push(item);
        }
      } else {
        if (item.includes(searchParam)) {
          result.push(item);
        }
      }
    });
  });
  return result.sort((a, b) => a.localeCompare(b, "cs"));
}

function messageSort_2(
  stringArray: string[],
  stringTuple: readonly string[],
  ignore_case?: boolean,
  sort_default?: boolean,
) {
  //   let result: string[] = [];
  const result = stringArray.filter((item) => {
    return ignore_case
      ? stringTuple.some((searchParam) => item.toLowerCase().includes(searchParam.toLowerCase()))
      : stringTuple.some((searchParam) => item.includes(searchParam));
  });
  return sort_default ? result.sort((a, b) => a.localeCompare(b, "cs")) : result;
}

function messageSort_3(
  stringArray: string[],
  stringTuple: readonly string[],
  ignore_case?: boolean,
  sort_default?: boolean,
) {
  const normalize = (s: string) => (ignore_case ? s.toLowerCase() : s);
  const result = stringArray.filter((item) => stringTuple.some((p) => normalize(item).includes(normalize(p))));
  return sort_default ? result.sort((a, b) => a.localeCompare(b, "cs")) : result;
}

const inputArray = [
  "b err",
  "c err",
  "a err",
  "Start programu 11:00",
  "Velmi zatížené CPU wrn 5061",
  "Dochází místo na disku 5062",
  "Vyčerpáno místa na disku err 42: disk /dev/sdb",
  "Vyčerpáno místa na disku2 err 42: disk /dev/sdb  wrn 34",
  "Konec programu 11:03",
];

const searchParams = ["konec", "err", "cpu"];

const result = messageSort_1(inputArray, searchParams, true, true);
console.log(result);
