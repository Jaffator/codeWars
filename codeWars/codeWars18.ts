// Napiš bez knihoven funkce debounce(fn, ms) a throttle(fn, ms).

// Požadavky
// debounce vrátí funkci, která zavolá fn až ve chvíli, kdy ms milisekund nepřišlo další volání. Každé nové volání čekání restartuje. fn dostane argumenty a this posledního volání.
// throttle vrátí funkci, která zavolá fn nejvýš jednou za ms. První volání proběhne hned. Volání během čekání se neztratí: poslední z nich proběhne jednou na konci okna se svými argumenty.
// Obě vrácené funkce mají cancel(), které zahodí volání, jež ještě čeká.

// Rozhraní a příklad
// const save = debounce((text) => console.log("save", text), 300);
// save("a"); save("ab"); save("abc");     // po 300 ms: save abc (jednou)

// const onScroll = throttle((y) => console.log("scroll", y), 100);
// onScroll(1);                            // hned: scroll 1
// onScroll(2); onScroll(3);               // ve 100 ms: scroll 3

// save("x"); save.cancel();               // neproběhne nic

function debounce<T, R>(fn: (arg?: T) => R, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  function wrapper(this: ThisParameterType<typeof fn>, arg: T): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, [arg]);
    }, ms);
  }
  wrapper.cancel = (): void => {
    clearTimeout(timer);
  };
}

const save = debounce((text) => console.log(text), 2000);
console.log(save);
