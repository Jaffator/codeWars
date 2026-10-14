// deepClone s cykly
// 15 min
// Napiš vlastní hlubokou kopii JavaScriptové hodnoty, včetně cyklických referencí.

// ---Podrobné zadání---:
// Požadavky
// deepClone(value) vrátí kopii, která s originálem nesdílí žádný měnitelný objekt.
// Podporuje obyčejné objekty, pole, Date, Map (klonují se klíče i hodnoty), Set a primitivní hodnoty. Funkce se ponechají, jak jsou.
// Sdílené a cyklické reference se zachovají: když originál dvakrát ukazuje na stejný objekt, kopie dvakrát ukazuje na stejnou kopii. Cykly nevedou k nekonečné rekurzi.
// Nakonec porovnej se structuredClone: co zvládá a co ne (funkce, prototypy tříd).
