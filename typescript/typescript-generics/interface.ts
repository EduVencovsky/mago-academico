interface Data<T extends string | number> {
    id: T;
}

const filterById = <T extends string | number>(id: T, data: Data<T>[]) => {
    return data.filter((x) => x.id !== id);
};
// @ts-expect-error
filterById({}, [{ id: {} }])

const nData = [{ id: 123 }, { id: 321 }]
const sData = [{ id: '123' }, { id: '321' }]

filterById(123, nData)[0].id
filterById('123', sData)[0].id