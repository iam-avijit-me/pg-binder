// Recursively trim spaces from both ends in one type
type Trim<S extends string> =
    S extends ` ${infer Rest}` ? Trim<Rest> :         // Trim left spaces
        S extends `${infer Rest} ` ? Trim<Rest> :    // Trim right spaces
            S;

// Extract keys ignoring surrounding spaces inside $(...)
type ExtractKeys<S extends string> =
    S extends `${string}$(${infer Key})${infer Rest}`
        ? Trim<Key> | ExtractKeys<Rest>
        : never;

type Values<Q extends string> = {
    [K in ExtractKeys<Q>]: any;
};


type BindResponse = [string, any[]];


export default function pgSqlBind<Q extends string>(query: Q, values: Values<Q>): BindResponse {

    const keys = query.match(/\$\((.*?)\)/g);
    if(!keys) return [query, []];
    let last_index = 0;

    let query_modified: string = query as string;
    const values_modified = [];

    for(const key of keys){
        const propName: string = key.slice(2, -1).trim();

        if(!values.hasOwnProperty(propName)){
            throw new Error(`pgSqlBind - Bind Error: Missing value for placeholder "${propName}". `);
        }

        query_modified = query_modified.replace(key, `$${++last_index}`);
        values_modified.push(values[propName as keyof Values<Q>]);
    }

    return [query_modified, values_modified];
}