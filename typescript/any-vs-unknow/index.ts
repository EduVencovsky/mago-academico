interface Foo {
  foo: string;
}

const isFooType = (foo: unknown): foo is Foo => {
  return (foo as Foo)?.foo !== undefined;
};

const foo = (anyType: any, unknowType: unknown) => {
  const str1: string = anyType;
  anyType();
  anyType.foo;
  
  // @ts-expect-error
  const str2: string = unknowType;
  // @ts-expect-error
  unknowType();
  // @ts-expect-error
  unknowType.foo;
  
  if (typeof unknowType === "string") {
    const str2: string = unknowType;
  } else if (typeof unknowType === "function") {
    unknowType();
  } else if (isFooType(unknowType)) {
    unknowType.foo;
  }
};

foo({}, {});
foo(123, 456);
foo(null, null);
foo(() => {}, () => {});
