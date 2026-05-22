
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model LoanApplication
 * 
 */
export type LoanApplication = $Result.DefaultSelection<Prisma.$LoanApplicationPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentAnalysis
 * 
 */
export type DocumentAnalysis = $Result.DefaultSelection<Prisma.$DocumentAnalysisPayload>
/**
 * Model FraudFlag
 * 
 */
export type FraudFlag = $Result.DefaultSelection<Prisma.$FraudFlagPayload>
/**
 * Model LoanDecision
 * 
 */
export type LoanDecision = $Result.DefaultSelection<Prisma.$LoanDecisionPayload>
/**
 * Model ComplianceReport
 * 
 */
export type ComplianceReport = $Result.DefaultSelection<Prisma.$ComplianceReportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LoanType: {
  PERSONAL: 'PERSONAL',
  HOME: 'HOME',
  VEHICLE: 'VEHICLE',
  BUSINESS: 'BUSINESS',
  EDUCATION: 'EDUCATION',
  GOLD: 'GOLD'
};

export type LoanType = (typeof LoanType)[keyof typeof LoanType]


export const LoanStatus: {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  DISBURSED: 'DISBURSED',
  CLOSED: 'CLOSED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const AnalysisStatus: {
  NOT_STARTED: 'NOT_STARTED',
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type AnalysisStatus = (typeof AnalysisStatus)[keyof typeof AnalysisStatus]


export const DocumentType: {
  AADHAAR: 'AADHAAR',
  PAN: 'PAN',
  ITR: 'ITR',
  EMPLOYMENT_LETTER: 'EMPLOYMENT_LETTER',
  SALARY_SLIP: 'SALARY_SLIP',
  BANK_STATEMENT: 'BANK_STATEMENT',
  FORM_16: 'FORM_16',
  PROPERTY_DOCS: 'PROPERTY_DOCS'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]

}

export type LoanType = $Enums.LoanType

export const LoanType: typeof $Enums.LoanType

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type AnalysisStatus = $Enums.AnalysisStatus

export const AnalysisStatus: typeof $Enums.AnalysisStatus

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more LoanApplications
 * const loanApplications = await prisma.loanApplication.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more LoanApplications
   * const loanApplications = await prisma.loanApplication.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.loanApplication`: Exposes CRUD operations for the **LoanApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoanApplications
    * const loanApplications = await prisma.loanApplication.findMany()
    * ```
    */
  get loanApplication(): Prisma.LoanApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentAnalysis`: Exposes CRUD operations for the **DocumentAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentAnalyses
    * const documentAnalyses = await prisma.documentAnalysis.findMany()
    * ```
    */
  get documentAnalysis(): Prisma.DocumentAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fraudFlag`: Exposes CRUD operations for the **FraudFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FraudFlags
    * const fraudFlags = await prisma.fraudFlag.findMany()
    * ```
    */
  get fraudFlag(): Prisma.FraudFlagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loanDecision`: Exposes CRUD operations for the **LoanDecision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoanDecisions
    * const loanDecisions = await prisma.loanDecision.findMany()
    * ```
    */
  get loanDecision(): Prisma.LoanDecisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complianceReport`: Exposes CRUD operations for the **ComplianceReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplianceReports
    * const complianceReports = await prisma.complianceReport.findMany()
    * ```
    */
  get complianceReport(): Prisma.ComplianceReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    LoanApplication: 'LoanApplication',
    Document: 'Document',
    DocumentAnalysis: 'DocumentAnalysis',
    FraudFlag: 'FraudFlag',
    LoanDecision: 'LoanDecision',
    ComplianceReport: 'ComplianceReport'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "loanApplication" | "document" | "documentAnalysis" | "fraudFlag" | "loanDecision" | "complianceReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      LoanApplication: {
        payload: Prisma.$LoanApplicationPayload<ExtArgs>
        fields: Prisma.LoanApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          findFirst: {
            args: Prisma.LoanApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          findMany: {
            args: Prisma.LoanApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>[]
          }
          create: {
            args: Prisma.LoanApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          createMany: {
            args: Prisma.LoanApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>[]
          }
          delete: {
            args: Prisma.LoanApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          update: {
            args: Prisma.LoanApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          deleteMany: {
            args: Prisma.LoanApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>[]
          }
          upsert: {
            args: Prisma.LoanApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          aggregate: {
            args: Prisma.LoanApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoanApplication>
          }
          groupBy: {
            args: Prisma.LoanApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<LoanApplicationCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentAnalysis: {
        payload: Prisma.$DocumentAnalysisPayload<ExtArgs>
        fields: Prisma.DocumentAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>
          }
          findFirst: {
            args: Prisma.DocumentAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>
          }
          findMany: {
            args: Prisma.DocumentAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>[]
          }
          create: {
            args: Prisma.DocumentAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>
          }
          createMany: {
            args: Prisma.DocumentAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>[]
          }
          delete: {
            args: Prisma.DocumentAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>
          }
          update: {
            args: Prisma.DocumentAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.DocumentAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.DocumentAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAnalysisPayload>
          }
          aggregate: {
            args: Prisma.DocumentAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentAnalysis>
          }
          groupBy: {
            args: Prisma.DocumentAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentAnalysisCountAggregateOutputType> | number
          }
        }
      }
      FraudFlag: {
        payload: Prisma.$FraudFlagPayload<ExtArgs>
        fields: Prisma.FraudFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FraudFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FraudFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>
          }
          findFirst: {
            args: Prisma.FraudFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FraudFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>
          }
          findMany: {
            args: Prisma.FraudFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>[]
          }
          create: {
            args: Prisma.FraudFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>
          }
          createMany: {
            args: Prisma.FraudFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FraudFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>[]
          }
          delete: {
            args: Prisma.FraudFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>
          }
          update: {
            args: Prisma.FraudFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>
          }
          deleteMany: {
            args: Prisma.FraudFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FraudFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FraudFlagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>[]
          }
          upsert: {
            args: Prisma.FraudFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FraudFlagPayload>
          }
          aggregate: {
            args: Prisma.FraudFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFraudFlag>
          }
          groupBy: {
            args: Prisma.FraudFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FraudFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FraudFlagCountArgs<ExtArgs>
            result: $Utils.Optional<FraudFlagCountAggregateOutputType> | number
          }
        }
      }
      LoanDecision: {
        payload: Prisma.$LoanDecisionPayload<ExtArgs>
        fields: Prisma.LoanDecisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanDecisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanDecisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>
          }
          findFirst: {
            args: Prisma.LoanDecisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanDecisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>
          }
          findMany: {
            args: Prisma.LoanDecisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>[]
          }
          create: {
            args: Prisma.LoanDecisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>
          }
          createMany: {
            args: Prisma.LoanDecisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanDecisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>[]
          }
          delete: {
            args: Prisma.LoanDecisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>
          }
          update: {
            args: Prisma.LoanDecisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>
          }
          deleteMany: {
            args: Prisma.LoanDecisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanDecisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanDecisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>[]
          }
          upsert: {
            args: Prisma.LoanDecisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanDecisionPayload>
          }
          aggregate: {
            args: Prisma.LoanDecisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoanDecision>
          }
          groupBy: {
            args: Prisma.LoanDecisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanDecisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanDecisionCountArgs<ExtArgs>
            result: $Utils.Optional<LoanDecisionCountAggregateOutputType> | number
          }
        }
      }
      ComplianceReport: {
        payload: Prisma.$ComplianceReportPayload<ExtArgs>
        fields: Prisma.ComplianceReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplianceReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplianceReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>
          }
          findFirst: {
            args: Prisma.ComplianceReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplianceReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>
          }
          findMany: {
            args: Prisma.ComplianceReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>[]
          }
          create: {
            args: Prisma.ComplianceReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>
          }
          createMany: {
            args: Prisma.ComplianceReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplianceReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>[]
          }
          delete: {
            args: Prisma.ComplianceReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>
          }
          update: {
            args: Prisma.ComplianceReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>
          }
          deleteMany: {
            args: Prisma.ComplianceReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplianceReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplianceReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>[]
          }
          upsert: {
            args: Prisma.ComplianceReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceReportPayload>
          }
          aggregate: {
            args: Prisma.ComplianceReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplianceReport>
          }
          groupBy: {
            args: Prisma.ComplianceReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplianceReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplianceReportCountArgs<ExtArgs>
            result: $Utils.Optional<ComplianceReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    loanApplication?: LoanApplicationOmit
    document?: DocumentOmit
    documentAnalysis?: DocumentAnalysisOmit
    fraudFlag?: FraudFlagOmit
    loanDecision?: LoanDecisionOmit
    complianceReport?: ComplianceReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LoanApplicationCountOutputType
   */

  export type LoanApplicationCountOutputType = {
    documents: number
    analysis: number
    fraudFlags: number
    complianceReports: number
  }

  export type LoanApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | LoanApplicationCountOutputTypeCountDocumentsArgs
    analysis?: boolean | LoanApplicationCountOutputTypeCountAnalysisArgs
    fraudFlags?: boolean | LoanApplicationCountOutputTypeCountFraudFlagsArgs
    complianceReports?: boolean | LoanApplicationCountOutputTypeCountComplianceReportsArgs
  }

  // Custom InputTypes
  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplicationCountOutputType
     */
    select?: LoanApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeCountAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentAnalysisWhereInput
  }

  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeCountFraudFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FraudFlagWhereInput
  }

  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeCountComplianceReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceReportWhereInput
  }


  /**
   * Models
   */

  /**
   * Model LoanApplication
   */

  export type AggregateLoanApplication = {
    _count: LoanApplicationCountAggregateOutputType | null
    _avg: LoanApplicationAvgAggregateOutputType | null
    _sum: LoanApplicationSumAggregateOutputType | null
    _min: LoanApplicationMinAggregateOutputType | null
    _max: LoanApplicationMaxAggregateOutputType | null
  }

  export type LoanApplicationAvgAggregateOutputType = {
    loanAmountRequested: number | null
    currentRiskScore: number | null
  }

  export type LoanApplicationSumAggregateOutputType = {
    loanAmountRequested: number | null
    currentRiskScore: number | null
  }

  export type LoanApplicationMinAggregateOutputType = {
    id: string | null
    applicationNumber: string | null
    applicantName: string | null
    applicantEmail: string | null
    applicantPhone: string | null
    loanAmountRequested: number | null
    loanType: $Enums.LoanType | null
    status: $Enums.LoanStatus | null
    analysisStatus: $Enums.AnalysisStatus | null
    analysisStartedAt: Date | null
    analysisCompletedAt: Date | null
    analysisError: string | null
    documentsUploadedAt: Date | null
    currentRiskScore: number | null
    recommendation: string | null
    officerId: string | null
    branchCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanApplicationMaxAggregateOutputType = {
    id: string | null
    applicationNumber: string | null
    applicantName: string | null
    applicantEmail: string | null
    applicantPhone: string | null
    loanAmountRequested: number | null
    loanType: $Enums.LoanType | null
    status: $Enums.LoanStatus | null
    analysisStatus: $Enums.AnalysisStatus | null
    analysisStartedAt: Date | null
    analysisCompletedAt: Date | null
    analysisError: string | null
    documentsUploadedAt: Date | null
    currentRiskScore: number | null
    recommendation: string | null
    officerId: string | null
    branchCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanApplicationCountAggregateOutputType = {
    id: number
    applicationNumber: number
    applicantName: number
    applicantEmail: number
    applicantPhone: number
    loanAmountRequested: number
    loanType: number
    status: number
    analysisStatus: number
    analysisStartedAt: number
    analysisCompletedAt: number
    analysisError: number
    documentsUploadedAt: number
    currentRiskScore: number
    recommendation: number
    officerId: number
    branchCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoanApplicationAvgAggregateInputType = {
    loanAmountRequested?: true
    currentRiskScore?: true
  }

  export type LoanApplicationSumAggregateInputType = {
    loanAmountRequested?: true
    currentRiskScore?: true
  }

  export type LoanApplicationMinAggregateInputType = {
    id?: true
    applicationNumber?: true
    applicantName?: true
    applicantEmail?: true
    applicantPhone?: true
    loanAmountRequested?: true
    loanType?: true
    status?: true
    analysisStatus?: true
    analysisStartedAt?: true
    analysisCompletedAt?: true
    analysisError?: true
    documentsUploadedAt?: true
    currentRiskScore?: true
    recommendation?: true
    officerId?: true
    branchCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanApplicationMaxAggregateInputType = {
    id?: true
    applicationNumber?: true
    applicantName?: true
    applicantEmail?: true
    applicantPhone?: true
    loanAmountRequested?: true
    loanType?: true
    status?: true
    analysisStatus?: true
    analysisStartedAt?: true
    analysisCompletedAt?: true
    analysisError?: true
    documentsUploadedAt?: true
    currentRiskScore?: true
    recommendation?: true
    officerId?: true
    branchCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanApplicationCountAggregateInputType = {
    id?: true
    applicationNumber?: true
    applicantName?: true
    applicantEmail?: true
    applicantPhone?: true
    loanAmountRequested?: true
    loanType?: true
    status?: true
    analysisStatus?: true
    analysisStartedAt?: true
    analysisCompletedAt?: true
    analysisError?: true
    documentsUploadedAt?: true
    currentRiskScore?: true
    recommendation?: true
    officerId?: true
    branchCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoanApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanApplication to aggregate.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoanApplications
    **/
    _count?: true | LoanApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanApplicationMaxAggregateInputType
  }

  export type GetLoanApplicationAggregateType<T extends LoanApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateLoanApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoanApplication[P]>
      : GetScalarType<T[P], AggregateLoanApplication[P]>
  }




  export type LoanApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanApplicationWhereInput
    orderBy?: LoanApplicationOrderByWithAggregationInput | LoanApplicationOrderByWithAggregationInput[]
    by: LoanApplicationScalarFieldEnum[] | LoanApplicationScalarFieldEnum
    having?: LoanApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanApplicationCountAggregateInputType | true
    _avg?: LoanApplicationAvgAggregateInputType
    _sum?: LoanApplicationSumAggregateInputType
    _min?: LoanApplicationMinAggregateInputType
    _max?: LoanApplicationMaxAggregateInputType
  }

  export type LoanApplicationGroupByOutputType = {
    id: string
    applicationNumber: string
    applicantName: string
    applicantEmail: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType: $Enums.LoanType
    status: $Enums.LoanStatus
    analysisStatus: $Enums.AnalysisStatus
    analysisStartedAt: Date | null
    analysisCompletedAt: Date | null
    analysisError: string | null
    documentsUploadedAt: Date | null
    currentRiskScore: number | null
    recommendation: string | null
    officerId: string | null
    branchCode: string | null
    createdAt: Date
    updatedAt: Date
    _count: LoanApplicationCountAggregateOutputType | null
    _avg: LoanApplicationAvgAggregateOutputType | null
    _sum: LoanApplicationSumAggregateOutputType | null
    _min: LoanApplicationMinAggregateOutputType | null
    _max: LoanApplicationMaxAggregateOutputType | null
  }

  type GetLoanApplicationGroupByPayload<T extends LoanApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], LoanApplicationGroupByOutputType[P]>
        }
      >
    >


  export type LoanApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationNumber?: boolean
    applicantName?: boolean
    applicantEmail?: boolean
    applicantPhone?: boolean
    loanAmountRequested?: boolean
    loanType?: boolean
    status?: boolean
    analysisStatus?: boolean
    analysisStartedAt?: boolean
    analysisCompletedAt?: boolean
    analysisError?: boolean
    documentsUploadedAt?: boolean
    currentRiskScore?: boolean
    recommendation?: boolean
    officerId?: boolean
    branchCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | LoanApplication$documentsArgs<ExtArgs>
    analysis?: boolean | LoanApplication$analysisArgs<ExtArgs>
    fraudFlags?: boolean | LoanApplication$fraudFlagsArgs<ExtArgs>
    complianceReports?: boolean | LoanApplication$complianceReportsArgs<ExtArgs>
    decision?: boolean | LoanApplication$decisionArgs<ExtArgs>
    _count?: boolean | LoanApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanApplication"]>

  export type LoanApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationNumber?: boolean
    applicantName?: boolean
    applicantEmail?: boolean
    applicantPhone?: boolean
    loanAmountRequested?: boolean
    loanType?: boolean
    status?: boolean
    analysisStatus?: boolean
    analysisStartedAt?: boolean
    analysisCompletedAt?: boolean
    analysisError?: boolean
    documentsUploadedAt?: boolean
    currentRiskScore?: boolean
    recommendation?: boolean
    officerId?: boolean
    branchCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loanApplication"]>

  export type LoanApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationNumber?: boolean
    applicantName?: boolean
    applicantEmail?: boolean
    applicantPhone?: boolean
    loanAmountRequested?: boolean
    loanType?: boolean
    status?: boolean
    analysisStatus?: boolean
    analysisStartedAt?: boolean
    analysisCompletedAt?: boolean
    analysisError?: boolean
    documentsUploadedAt?: boolean
    currentRiskScore?: boolean
    recommendation?: boolean
    officerId?: boolean
    branchCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loanApplication"]>

  export type LoanApplicationSelectScalar = {
    id?: boolean
    applicationNumber?: boolean
    applicantName?: boolean
    applicantEmail?: boolean
    applicantPhone?: boolean
    loanAmountRequested?: boolean
    loanType?: boolean
    status?: boolean
    analysisStatus?: boolean
    analysisStartedAt?: boolean
    analysisCompletedAt?: boolean
    analysisError?: boolean
    documentsUploadedAt?: boolean
    currentRiskScore?: boolean
    recommendation?: boolean
    officerId?: boolean
    branchCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoanApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationNumber" | "applicantName" | "applicantEmail" | "applicantPhone" | "loanAmountRequested" | "loanType" | "status" | "analysisStatus" | "analysisStartedAt" | "analysisCompletedAt" | "analysisError" | "documentsUploadedAt" | "currentRiskScore" | "recommendation" | "officerId" | "branchCode" | "createdAt" | "updatedAt", ExtArgs["result"]["loanApplication"]>
  export type LoanApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | LoanApplication$documentsArgs<ExtArgs>
    analysis?: boolean | LoanApplication$analysisArgs<ExtArgs>
    fraudFlags?: boolean | LoanApplication$fraudFlagsArgs<ExtArgs>
    complianceReports?: boolean | LoanApplication$complianceReportsArgs<ExtArgs>
    decision?: boolean | LoanApplication$decisionArgs<ExtArgs>
    _count?: boolean | LoanApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoanApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LoanApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LoanApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoanApplication"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      analysis: Prisma.$DocumentAnalysisPayload<ExtArgs>[]
      fraudFlags: Prisma.$FraudFlagPayload<ExtArgs>[]
      complianceReports: Prisma.$ComplianceReportPayload<ExtArgs>[]
      decision: Prisma.$LoanDecisionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      applicationNumber: string
      applicantName: string
      applicantEmail: string | null
      applicantPhone: string
      loanAmountRequested: number
      loanType: $Enums.LoanType
      status: $Enums.LoanStatus
      analysisStatus: $Enums.AnalysisStatus
      analysisStartedAt: Date | null
      analysisCompletedAt: Date | null
      analysisError: string | null
      documentsUploadedAt: Date | null
      currentRiskScore: number | null
      recommendation: string | null
      officerId: string | null
      branchCode: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loanApplication"]>
    composites: {}
  }

  type LoanApplicationGetPayload<S extends boolean | null | undefined | LoanApplicationDefaultArgs> = $Result.GetResult<Prisma.$LoanApplicationPayload, S>

  type LoanApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanApplicationCountAggregateInputType | true
    }

  export interface LoanApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoanApplication'], meta: { name: 'LoanApplication' } }
    /**
     * Find zero or one LoanApplication that matches the filter.
     * @param {LoanApplicationFindUniqueArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanApplicationFindUniqueArgs>(args: SelectSubset<T, LoanApplicationFindUniqueArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoanApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanApplicationFindUniqueOrThrowArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationFindFirstArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanApplicationFindFirstArgs>(args?: SelectSubset<T, LoanApplicationFindFirstArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationFindFirstOrThrowArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoanApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoanApplications
     * const loanApplications = await prisma.loanApplication.findMany()
     * 
     * // Get first 10 LoanApplications
     * const loanApplications = await prisma.loanApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanApplicationWithIdOnly = await prisma.loanApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanApplicationFindManyArgs>(args?: SelectSubset<T, LoanApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoanApplication.
     * @param {LoanApplicationCreateArgs} args - Arguments to create a LoanApplication.
     * @example
     * // Create one LoanApplication
     * const LoanApplication = await prisma.loanApplication.create({
     *   data: {
     *     // ... data to create a LoanApplication
     *   }
     * })
     * 
     */
    create<T extends LoanApplicationCreateArgs>(args: SelectSubset<T, LoanApplicationCreateArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoanApplications.
     * @param {LoanApplicationCreateManyArgs} args - Arguments to create many LoanApplications.
     * @example
     * // Create many LoanApplications
     * const loanApplication = await prisma.loanApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanApplicationCreateManyArgs>(args?: SelectSubset<T, LoanApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoanApplications and returns the data saved in the database.
     * @param {LoanApplicationCreateManyAndReturnArgs} args - Arguments to create many LoanApplications.
     * @example
     * // Create many LoanApplications
     * const loanApplication = await prisma.loanApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoanApplications and only return the `id`
     * const loanApplicationWithIdOnly = await prisma.loanApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoanApplication.
     * @param {LoanApplicationDeleteArgs} args - Arguments to delete one LoanApplication.
     * @example
     * // Delete one LoanApplication
     * const LoanApplication = await prisma.loanApplication.delete({
     *   where: {
     *     // ... filter to delete one LoanApplication
     *   }
     * })
     * 
     */
    delete<T extends LoanApplicationDeleteArgs>(args: SelectSubset<T, LoanApplicationDeleteArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoanApplication.
     * @param {LoanApplicationUpdateArgs} args - Arguments to update one LoanApplication.
     * @example
     * // Update one LoanApplication
     * const loanApplication = await prisma.loanApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanApplicationUpdateArgs>(args: SelectSubset<T, LoanApplicationUpdateArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoanApplications.
     * @param {LoanApplicationDeleteManyArgs} args - Arguments to filter LoanApplications to delete.
     * @example
     * // Delete a few LoanApplications
     * const { count } = await prisma.loanApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanApplicationDeleteManyArgs>(args?: SelectSubset<T, LoanApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoanApplications
     * const loanApplication = await prisma.loanApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanApplicationUpdateManyArgs>(args: SelectSubset<T, LoanApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanApplications and returns the data updated in the database.
     * @param {LoanApplicationUpdateManyAndReturnArgs} args - Arguments to update many LoanApplications.
     * @example
     * // Update many LoanApplications
     * const loanApplication = await prisma.loanApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoanApplications and only return the `id`
     * const loanApplicationWithIdOnly = await prisma.loanApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoanApplication.
     * @param {LoanApplicationUpsertArgs} args - Arguments to update or create a LoanApplication.
     * @example
     * // Update or create a LoanApplication
     * const loanApplication = await prisma.loanApplication.upsert({
     *   create: {
     *     // ... data to create a LoanApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoanApplication we want to update
     *   }
     * })
     */
    upsert<T extends LoanApplicationUpsertArgs>(args: SelectSubset<T, LoanApplicationUpsertArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoanApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationCountArgs} args - Arguments to filter LoanApplications to count.
     * @example
     * // Count the number of LoanApplications
     * const count = await prisma.loanApplication.count({
     *   where: {
     *     // ... the filter for the LoanApplications we want to count
     *   }
     * })
    **/
    count<T extends LoanApplicationCountArgs>(
      args?: Subset<T, LoanApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoanApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanApplicationAggregateArgs>(args: Subset<T, LoanApplicationAggregateArgs>): Prisma.PrismaPromise<GetLoanApplicationAggregateType<T>>

    /**
     * Group by LoanApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanApplicationGroupByArgs['orderBy'] }
        : { orderBy?: LoanApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoanApplication model
   */
  readonly fields: LoanApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoanApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends LoanApplication$documentsArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplication$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analysis<T extends LoanApplication$analysisArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplication$analysisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fraudFlags<T extends LoanApplication$fraudFlagsArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplication$fraudFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    complianceReports<T extends LoanApplication$complianceReportsArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplication$complianceReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    decision<T extends LoanApplication$decisionArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplication$decisionArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoanApplication model
   */
  interface LoanApplicationFieldRefs {
    readonly id: FieldRef<"LoanApplication", 'String'>
    readonly applicationNumber: FieldRef<"LoanApplication", 'String'>
    readonly applicantName: FieldRef<"LoanApplication", 'String'>
    readonly applicantEmail: FieldRef<"LoanApplication", 'String'>
    readonly applicantPhone: FieldRef<"LoanApplication", 'String'>
    readonly loanAmountRequested: FieldRef<"LoanApplication", 'Float'>
    readonly loanType: FieldRef<"LoanApplication", 'LoanType'>
    readonly status: FieldRef<"LoanApplication", 'LoanStatus'>
    readonly analysisStatus: FieldRef<"LoanApplication", 'AnalysisStatus'>
    readonly analysisStartedAt: FieldRef<"LoanApplication", 'DateTime'>
    readonly analysisCompletedAt: FieldRef<"LoanApplication", 'DateTime'>
    readonly analysisError: FieldRef<"LoanApplication", 'String'>
    readonly documentsUploadedAt: FieldRef<"LoanApplication", 'DateTime'>
    readonly currentRiskScore: FieldRef<"LoanApplication", 'Int'>
    readonly recommendation: FieldRef<"LoanApplication", 'String'>
    readonly officerId: FieldRef<"LoanApplication", 'String'>
    readonly branchCode: FieldRef<"LoanApplication", 'String'>
    readonly createdAt: FieldRef<"LoanApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"LoanApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoanApplication findUnique
   */
  export type LoanApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication findUniqueOrThrow
   */
  export type LoanApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication findFirst
   */
  export type LoanApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanApplications.
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanApplications.
     */
    distinct?: LoanApplicationScalarFieldEnum | LoanApplicationScalarFieldEnum[]
  }

  /**
   * LoanApplication findFirstOrThrow
   */
  export type LoanApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanApplications.
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanApplications.
     */
    distinct?: LoanApplicationScalarFieldEnum | LoanApplicationScalarFieldEnum[]
  }

  /**
   * LoanApplication findMany
   */
  export type LoanApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplications to fetch.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoanApplications.
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanApplications.
     */
    distinct?: LoanApplicationScalarFieldEnum | LoanApplicationScalarFieldEnum[]
  }

  /**
   * LoanApplication create
   */
  export type LoanApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a LoanApplication.
     */
    data: XOR<LoanApplicationCreateInput, LoanApplicationUncheckedCreateInput>
  }

  /**
   * LoanApplication createMany
   */
  export type LoanApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoanApplications.
     */
    data: LoanApplicationCreateManyInput | LoanApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanApplication createManyAndReturn
   */
  export type LoanApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many LoanApplications.
     */
    data: LoanApplicationCreateManyInput | LoanApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanApplication update
   */
  export type LoanApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a LoanApplication.
     */
    data: XOR<LoanApplicationUpdateInput, LoanApplicationUncheckedUpdateInput>
    /**
     * Choose, which LoanApplication to update.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication updateMany
   */
  export type LoanApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoanApplications.
     */
    data: XOR<LoanApplicationUpdateManyMutationInput, LoanApplicationUncheckedUpdateManyInput>
    /**
     * Filter which LoanApplications to update
     */
    where?: LoanApplicationWhereInput
    /**
     * Limit how many LoanApplications to update.
     */
    limit?: number
  }

  /**
   * LoanApplication updateManyAndReturn
   */
  export type LoanApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * The data used to update LoanApplications.
     */
    data: XOR<LoanApplicationUpdateManyMutationInput, LoanApplicationUncheckedUpdateManyInput>
    /**
     * Filter which LoanApplications to update
     */
    where?: LoanApplicationWhereInput
    /**
     * Limit how many LoanApplications to update.
     */
    limit?: number
  }

  /**
   * LoanApplication upsert
   */
  export type LoanApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the LoanApplication to update in case it exists.
     */
    where: LoanApplicationWhereUniqueInput
    /**
     * In case the LoanApplication found by the `where` argument doesn't exist, create a new LoanApplication with this data.
     */
    create: XOR<LoanApplicationCreateInput, LoanApplicationUncheckedCreateInput>
    /**
     * In case the LoanApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanApplicationUpdateInput, LoanApplicationUncheckedUpdateInput>
  }

  /**
   * LoanApplication delete
   */
  export type LoanApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter which LoanApplication to delete.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication deleteMany
   */
  export type LoanApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanApplications to delete
     */
    where?: LoanApplicationWhereInput
    /**
     * Limit how many LoanApplications to delete.
     */
    limit?: number
  }

  /**
   * LoanApplication.documents
   */
  export type LoanApplication$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * LoanApplication.analysis
   */
  export type LoanApplication$analysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    where?: DocumentAnalysisWhereInput
    orderBy?: DocumentAnalysisOrderByWithRelationInput | DocumentAnalysisOrderByWithRelationInput[]
    cursor?: DocumentAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentAnalysisScalarFieldEnum | DocumentAnalysisScalarFieldEnum[]
  }

  /**
   * LoanApplication.fraudFlags
   */
  export type LoanApplication$fraudFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    where?: FraudFlagWhereInput
    orderBy?: FraudFlagOrderByWithRelationInput | FraudFlagOrderByWithRelationInput[]
    cursor?: FraudFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FraudFlagScalarFieldEnum | FraudFlagScalarFieldEnum[]
  }

  /**
   * LoanApplication.complianceReports
   */
  export type LoanApplication$complianceReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    where?: ComplianceReportWhereInput
    orderBy?: ComplianceReportOrderByWithRelationInput | ComplianceReportOrderByWithRelationInput[]
    cursor?: ComplianceReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplianceReportScalarFieldEnum | ComplianceReportScalarFieldEnum[]
  }

  /**
   * LoanApplication.decision
   */
  export type LoanApplication$decisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    where?: LoanDecisionWhereInput
  }

  /**
   * LoanApplication without action
   */
  export type LoanApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanApplication
     */
    omit?: LoanApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type DocumentSumAggregateOutputType = {
    sizeBytes: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    type: $Enums.DocumentType | null
    s3Key: string | null
    s3Url: string | null
    originalFilename: string | null
    mimeType: string | null
    sizeBytes: number | null
    uploadedBy: string | null
    analysisStatus: string | null
    createdAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    type: $Enums.DocumentType | null
    s3Key: string | null
    s3Url: string | null
    originalFilename: string | null
    mimeType: string | null
    sizeBytes: number | null
    uploadedBy: string | null
    analysisStatus: string | null
    createdAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    loanApplicationId: number
    type: number
    s3Key: number
    s3Url: number
    originalFilename: number
    mimeType: number
    sizeBytes: number
    uploadedBy: number
    analysisStatus: number
    createdAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type DocumentSumAggregateInputType = {
    sizeBytes?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    loanApplicationId?: true
    type?: true
    s3Key?: true
    s3Url?: true
    originalFilename?: true
    mimeType?: true
    sizeBytes?: true
    uploadedBy?: true
    analysisStatus?: true
    createdAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    loanApplicationId?: true
    type?: true
    s3Key?: true
    s3Url?: true
    originalFilename?: true
    mimeType?: true
    sizeBytes?: true
    uploadedBy?: true
    analysisStatus?: true
    createdAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    loanApplicationId?: true
    type?: true
    s3Key?: true
    s3Url?: true
    originalFilename?: true
    mimeType?: true
    sizeBytes?: true
    uploadedBy?: true
    analysisStatus?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    loanApplicationId: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus: string
    createdAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    type?: boolean
    s3Key?: boolean
    s3Url?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    analysisStatus?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    type?: boolean
    s3Key?: boolean
    s3Url?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    analysisStatus?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    type?: boolean
    s3Key?: boolean
    s3Url?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    analysisStatus?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    loanApplicationId?: boolean
    type?: boolean
    s3Key?: boolean
    s3Url?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    analysisStatus?: boolean
    createdAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanApplicationId" | "type" | "s3Key" | "s3Url" | "originalFilename" | "mimeType" | "sizeBytes" | "uploadedBy" | "analysisStatus" | "createdAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      loanApplication: Prisma.$LoanApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanApplicationId: string
      type: $Enums.DocumentType
      s3Key: string
      s3Url: string
      originalFilename: string
      mimeType: string
      sizeBytes: number
      uploadedBy: string
      analysisStatus: string
      createdAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loanApplication<T extends LoanApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplicationDefaultArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly loanApplicationId: FieldRef<"Document", 'String'>
    readonly type: FieldRef<"Document", 'DocumentType'>
    readonly s3Key: FieldRef<"Document", 'String'>
    readonly s3Url: FieldRef<"Document", 'String'>
    readonly originalFilename: FieldRef<"Document", 'String'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly sizeBytes: FieldRef<"Document", 'Int'>
    readonly uploadedBy: FieldRef<"Document", 'String'>
    readonly analysisStatus: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentAnalysis
   */

  export type AggregateDocumentAnalysis = {
    _count: DocumentAnalysisCountAggregateOutputType | null
    _avg: DocumentAnalysisAvgAggregateOutputType | null
    _sum: DocumentAnalysisSumAggregateOutputType | null
    _min: DocumentAnalysisMinAggregateOutputType | null
    _max: DocumentAnalysisMaxAggregateOutputType | null
  }

  export type DocumentAnalysisAvgAggregateOutputType = {
    riskScore: number | null
    processingTimeMs: number | null
  }

  export type DocumentAnalysisSumAggregateOutputType = {
    riskScore: number | null
    processingTimeMs: number | null
  }

  export type DocumentAnalysisMinAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    riskScore: number | null
    recommendation: string | null
    riskLevel: string | null
    processingTimeMs: number | null
    analyzedAt: Date | null
    createdAt: Date | null
  }

  export type DocumentAnalysisMaxAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    riskScore: number | null
    recommendation: string | null
    riskLevel: string | null
    processingTimeMs: number | null
    analyzedAt: Date | null
    createdAt: Date | null
  }

  export type DocumentAnalysisCountAggregateOutputType = {
    id: number
    loanApplicationId: number
    riskScore: number
    recommendation: number
    riskLevel: number
    processingTimeMs: number
    documentsResult: number
    crossChecks: number
    riskFactors: number
    analyzedAt: number
    createdAt: number
    _all: number
  }


  export type DocumentAnalysisAvgAggregateInputType = {
    riskScore?: true
    processingTimeMs?: true
  }

  export type DocumentAnalysisSumAggregateInputType = {
    riskScore?: true
    processingTimeMs?: true
  }

  export type DocumentAnalysisMinAggregateInputType = {
    id?: true
    loanApplicationId?: true
    riskScore?: true
    recommendation?: true
    riskLevel?: true
    processingTimeMs?: true
    analyzedAt?: true
    createdAt?: true
  }

  export type DocumentAnalysisMaxAggregateInputType = {
    id?: true
    loanApplicationId?: true
    riskScore?: true
    recommendation?: true
    riskLevel?: true
    processingTimeMs?: true
    analyzedAt?: true
    createdAt?: true
  }

  export type DocumentAnalysisCountAggregateInputType = {
    id?: true
    loanApplicationId?: true
    riskScore?: true
    recommendation?: true
    riskLevel?: true
    processingTimeMs?: true
    documentsResult?: true
    crossChecks?: true
    riskFactors?: true
    analyzedAt?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentAnalysis to aggregate.
     */
    where?: DocumentAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAnalyses to fetch.
     */
    orderBy?: DocumentAnalysisOrderByWithRelationInput | DocumentAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentAnalyses
    **/
    _count?: true | DocumentAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentAnalysisMaxAggregateInputType
  }

  export type GetDocumentAnalysisAggregateType<T extends DocumentAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentAnalysis[P]>
      : GetScalarType<T[P], AggregateDocumentAnalysis[P]>
  }




  export type DocumentAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentAnalysisWhereInput
    orderBy?: DocumentAnalysisOrderByWithAggregationInput | DocumentAnalysisOrderByWithAggregationInput[]
    by: DocumentAnalysisScalarFieldEnum[] | DocumentAnalysisScalarFieldEnum
    having?: DocumentAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentAnalysisCountAggregateInputType | true
    _avg?: DocumentAnalysisAvgAggregateInputType
    _sum?: DocumentAnalysisSumAggregateInputType
    _min?: DocumentAnalysisMinAggregateInputType
    _max?: DocumentAnalysisMaxAggregateInputType
  }

  export type DocumentAnalysisGroupByOutputType = {
    id: string
    loanApplicationId: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonValue
    crossChecks: JsonValue
    riskFactors: JsonValue
    analyzedAt: Date
    createdAt: Date
    _count: DocumentAnalysisCountAggregateOutputType | null
    _avg: DocumentAnalysisAvgAggregateOutputType | null
    _sum: DocumentAnalysisSumAggregateOutputType | null
    _min: DocumentAnalysisMinAggregateOutputType | null
    _max: DocumentAnalysisMaxAggregateOutputType | null
  }

  type GetDocumentAnalysisGroupByPayload<T extends DocumentAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type DocumentAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    recommendation?: boolean
    riskLevel?: boolean
    processingTimeMs?: boolean
    documentsResult?: boolean
    crossChecks?: boolean
    riskFactors?: boolean
    analyzedAt?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentAnalysis"]>

  export type DocumentAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    recommendation?: boolean
    riskLevel?: boolean
    processingTimeMs?: boolean
    documentsResult?: boolean
    crossChecks?: boolean
    riskFactors?: boolean
    analyzedAt?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentAnalysis"]>

  export type DocumentAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    recommendation?: boolean
    riskLevel?: boolean
    processingTimeMs?: boolean
    documentsResult?: boolean
    crossChecks?: boolean
    riskFactors?: boolean
    analyzedAt?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentAnalysis"]>

  export type DocumentAnalysisSelectScalar = {
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    recommendation?: boolean
    riskLevel?: boolean
    processingTimeMs?: boolean
    documentsResult?: boolean
    crossChecks?: boolean
    riskFactors?: boolean
    analyzedAt?: boolean
    createdAt?: boolean
  }

  export type DocumentAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanApplicationId" | "riskScore" | "recommendation" | "riskLevel" | "processingTimeMs" | "documentsResult" | "crossChecks" | "riskFactors" | "analyzedAt" | "createdAt", ExtArgs["result"]["documentAnalysis"]>
  export type DocumentAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type DocumentAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type DocumentAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }

  export type $DocumentAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentAnalysis"
    objects: {
      loanApplication: Prisma.$LoanApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanApplicationId: string
      riskScore: number
      recommendation: string
      riskLevel: string
      processingTimeMs: number
      documentsResult: Prisma.JsonValue
      crossChecks: Prisma.JsonValue
      riskFactors: Prisma.JsonValue
      analyzedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["documentAnalysis"]>
    composites: {}
  }

  type DocumentAnalysisGetPayload<S extends boolean | null | undefined | DocumentAnalysisDefaultArgs> = $Result.GetResult<Prisma.$DocumentAnalysisPayload, S>

  type DocumentAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentAnalysisCountAggregateInputType | true
    }

  export interface DocumentAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentAnalysis'], meta: { name: 'DocumentAnalysis' } }
    /**
     * Find zero or one DocumentAnalysis that matches the filter.
     * @param {DocumentAnalysisFindUniqueArgs} args - Arguments to find a DocumentAnalysis
     * @example
     * // Get one DocumentAnalysis
     * const documentAnalysis = await prisma.documentAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentAnalysisFindUniqueArgs>(args: SelectSubset<T, DocumentAnalysisFindUniqueArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentAnalysisFindUniqueOrThrowArgs} args - Arguments to find a DocumentAnalysis
     * @example
     * // Get one DocumentAnalysis
     * const documentAnalysis = await prisma.documentAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisFindFirstArgs} args - Arguments to find a DocumentAnalysis
     * @example
     * // Get one DocumentAnalysis
     * const documentAnalysis = await prisma.documentAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentAnalysisFindFirstArgs>(args?: SelectSubset<T, DocumentAnalysisFindFirstArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisFindFirstOrThrowArgs} args - Arguments to find a DocumentAnalysis
     * @example
     * // Get one DocumentAnalysis
     * const documentAnalysis = await prisma.documentAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentAnalyses
     * const documentAnalyses = await prisma.documentAnalysis.findMany()
     * 
     * // Get first 10 DocumentAnalyses
     * const documentAnalyses = await prisma.documentAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentAnalysisWithIdOnly = await prisma.documentAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentAnalysisFindManyArgs>(args?: SelectSubset<T, DocumentAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentAnalysis.
     * @param {DocumentAnalysisCreateArgs} args - Arguments to create a DocumentAnalysis.
     * @example
     * // Create one DocumentAnalysis
     * const DocumentAnalysis = await prisma.documentAnalysis.create({
     *   data: {
     *     // ... data to create a DocumentAnalysis
     *   }
     * })
     * 
     */
    create<T extends DocumentAnalysisCreateArgs>(args: SelectSubset<T, DocumentAnalysisCreateArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentAnalyses.
     * @param {DocumentAnalysisCreateManyArgs} args - Arguments to create many DocumentAnalyses.
     * @example
     * // Create many DocumentAnalyses
     * const documentAnalysis = await prisma.documentAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentAnalysisCreateManyArgs>(args?: SelectSubset<T, DocumentAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentAnalyses and returns the data saved in the database.
     * @param {DocumentAnalysisCreateManyAndReturnArgs} args - Arguments to create many DocumentAnalyses.
     * @example
     * // Create many DocumentAnalyses
     * const documentAnalysis = await prisma.documentAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentAnalyses and only return the `id`
     * const documentAnalysisWithIdOnly = await prisma.documentAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentAnalysis.
     * @param {DocumentAnalysisDeleteArgs} args - Arguments to delete one DocumentAnalysis.
     * @example
     * // Delete one DocumentAnalysis
     * const DocumentAnalysis = await prisma.documentAnalysis.delete({
     *   where: {
     *     // ... filter to delete one DocumentAnalysis
     *   }
     * })
     * 
     */
    delete<T extends DocumentAnalysisDeleteArgs>(args: SelectSubset<T, DocumentAnalysisDeleteArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentAnalysis.
     * @param {DocumentAnalysisUpdateArgs} args - Arguments to update one DocumentAnalysis.
     * @example
     * // Update one DocumentAnalysis
     * const documentAnalysis = await prisma.documentAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentAnalysisUpdateArgs>(args: SelectSubset<T, DocumentAnalysisUpdateArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentAnalyses.
     * @param {DocumentAnalysisDeleteManyArgs} args - Arguments to filter DocumentAnalyses to delete.
     * @example
     * // Delete a few DocumentAnalyses
     * const { count } = await prisma.documentAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentAnalysisDeleteManyArgs>(args?: SelectSubset<T, DocumentAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentAnalyses
     * const documentAnalysis = await prisma.documentAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentAnalysisUpdateManyArgs>(args: SelectSubset<T, DocumentAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentAnalyses and returns the data updated in the database.
     * @param {DocumentAnalysisUpdateManyAndReturnArgs} args - Arguments to update many DocumentAnalyses.
     * @example
     * // Update many DocumentAnalyses
     * const documentAnalysis = await prisma.documentAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentAnalyses and only return the `id`
     * const documentAnalysisWithIdOnly = await prisma.documentAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentAnalysis.
     * @param {DocumentAnalysisUpsertArgs} args - Arguments to update or create a DocumentAnalysis.
     * @example
     * // Update or create a DocumentAnalysis
     * const documentAnalysis = await prisma.documentAnalysis.upsert({
     *   create: {
     *     // ... data to create a DocumentAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends DocumentAnalysisUpsertArgs>(args: SelectSubset<T, DocumentAnalysisUpsertArgs<ExtArgs>>): Prisma__DocumentAnalysisClient<$Result.GetResult<Prisma.$DocumentAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisCountArgs} args - Arguments to filter DocumentAnalyses to count.
     * @example
     * // Count the number of DocumentAnalyses
     * const count = await prisma.documentAnalysis.count({
     *   where: {
     *     // ... the filter for the DocumentAnalyses we want to count
     *   }
     * })
    **/
    count<T extends DocumentAnalysisCountArgs>(
      args?: Subset<T, DocumentAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAnalysisAggregateArgs>(args: Subset<T, DocumentAnalysisAggregateArgs>): Prisma.PrismaPromise<GetDocumentAnalysisAggregateType<T>>

    /**
     * Group by DocumentAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: DocumentAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentAnalysis model
   */
  readonly fields: DocumentAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loanApplication<T extends LoanApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplicationDefaultArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentAnalysis model
   */
  interface DocumentAnalysisFieldRefs {
    readonly id: FieldRef<"DocumentAnalysis", 'String'>
    readonly loanApplicationId: FieldRef<"DocumentAnalysis", 'String'>
    readonly riskScore: FieldRef<"DocumentAnalysis", 'Int'>
    readonly recommendation: FieldRef<"DocumentAnalysis", 'String'>
    readonly riskLevel: FieldRef<"DocumentAnalysis", 'String'>
    readonly processingTimeMs: FieldRef<"DocumentAnalysis", 'Int'>
    readonly documentsResult: FieldRef<"DocumentAnalysis", 'Json'>
    readonly crossChecks: FieldRef<"DocumentAnalysis", 'Json'>
    readonly riskFactors: FieldRef<"DocumentAnalysis", 'Json'>
    readonly analyzedAt: FieldRef<"DocumentAnalysis", 'DateTime'>
    readonly createdAt: FieldRef<"DocumentAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentAnalysis findUnique
   */
  export type DocumentAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAnalysis to fetch.
     */
    where: DocumentAnalysisWhereUniqueInput
  }

  /**
   * DocumentAnalysis findUniqueOrThrow
   */
  export type DocumentAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAnalysis to fetch.
     */
    where: DocumentAnalysisWhereUniqueInput
  }

  /**
   * DocumentAnalysis findFirst
   */
  export type DocumentAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAnalysis to fetch.
     */
    where?: DocumentAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAnalyses to fetch.
     */
    orderBy?: DocumentAnalysisOrderByWithRelationInput | DocumentAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentAnalyses.
     */
    cursor?: DocumentAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentAnalyses.
     */
    distinct?: DocumentAnalysisScalarFieldEnum | DocumentAnalysisScalarFieldEnum[]
  }

  /**
   * DocumentAnalysis findFirstOrThrow
   */
  export type DocumentAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAnalysis to fetch.
     */
    where?: DocumentAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAnalyses to fetch.
     */
    orderBy?: DocumentAnalysisOrderByWithRelationInput | DocumentAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentAnalyses.
     */
    cursor?: DocumentAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentAnalyses.
     */
    distinct?: DocumentAnalysisScalarFieldEnum | DocumentAnalysisScalarFieldEnum[]
  }

  /**
   * DocumentAnalysis findMany
   */
  export type DocumentAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAnalyses to fetch.
     */
    where?: DocumentAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAnalyses to fetch.
     */
    orderBy?: DocumentAnalysisOrderByWithRelationInput | DocumentAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentAnalyses.
     */
    cursor?: DocumentAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentAnalyses.
     */
    distinct?: DocumentAnalysisScalarFieldEnum | DocumentAnalysisScalarFieldEnum[]
  }

  /**
   * DocumentAnalysis create
   */
  export type DocumentAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentAnalysis.
     */
    data: XOR<DocumentAnalysisCreateInput, DocumentAnalysisUncheckedCreateInput>
  }

  /**
   * DocumentAnalysis createMany
   */
  export type DocumentAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentAnalyses.
     */
    data: DocumentAnalysisCreateManyInput | DocumentAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentAnalysis createManyAndReturn
   */
  export type DocumentAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentAnalyses.
     */
    data: DocumentAnalysisCreateManyInput | DocumentAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentAnalysis update
   */
  export type DocumentAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentAnalysis.
     */
    data: XOR<DocumentAnalysisUpdateInput, DocumentAnalysisUncheckedUpdateInput>
    /**
     * Choose, which DocumentAnalysis to update.
     */
    where: DocumentAnalysisWhereUniqueInput
  }

  /**
   * DocumentAnalysis updateMany
   */
  export type DocumentAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentAnalyses.
     */
    data: XOR<DocumentAnalysisUpdateManyMutationInput, DocumentAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which DocumentAnalyses to update
     */
    where?: DocumentAnalysisWhereInput
    /**
     * Limit how many DocumentAnalyses to update.
     */
    limit?: number
  }

  /**
   * DocumentAnalysis updateManyAndReturn
   */
  export type DocumentAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update DocumentAnalyses.
     */
    data: XOR<DocumentAnalysisUpdateManyMutationInput, DocumentAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which DocumentAnalyses to update
     */
    where?: DocumentAnalysisWhereInput
    /**
     * Limit how many DocumentAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentAnalysis upsert
   */
  export type DocumentAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentAnalysis to update in case it exists.
     */
    where: DocumentAnalysisWhereUniqueInput
    /**
     * In case the DocumentAnalysis found by the `where` argument doesn't exist, create a new DocumentAnalysis with this data.
     */
    create: XOR<DocumentAnalysisCreateInput, DocumentAnalysisUncheckedCreateInput>
    /**
     * In case the DocumentAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentAnalysisUpdateInput, DocumentAnalysisUncheckedUpdateInput>
  }

  /**
   * DocumentAnalysis delete
   */
  export type DocumentAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
    /**
     * Filter which DocumentAnalysis to delete.
     */
    where: DocumentAnalysisWhereUniqueInput
  }

  /**
   * DocumentAnalysis deleteMany
   */
  export type DocumentAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentAnalyses to delete
     */
    where?: DocumentAnalysisWhereInput
    /**
     * Limit how many DocumentAnalyses to delete.
     */
    limit?: number
  }

  /**
   * DocumentAnalysis without action
   */
  export type DocumentAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAnalysis
     */
    select?: DocumentAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentAnalysis
     */
    omit?: DocumentAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAnalysisInclude<ExtArgs> | null
  }


  /**
   * Model FraudFlag
   */

  export type AggregateFraudFlag = {
    _count: FraudFlagCountAggregateOutputType | null
    _avg: FraudFlagAvgAggregateOutputType | null
    _sum: FraudFlagSumAggregateOutputType | null
    _min: FraudFlagMinAggregateOutputType | null
    _max: FraudFlagMaxAggregateOutputType | null
  }

  export type FraudFlagAvgAggregateOutputType = {
    riskScore: number | null
  }

  export type FraudFlagSumAggregateOutputType = {
    riskScore: number | null
  }

  export type FraudFlagMinAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    riskScore: number | null
    flaggedBy: string | null
    resolved: boolean | null
    resolvedBy: string | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type FraudFlagMaxAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    riskScore: number | null
    flaggedBy: string | null
    resolved: boolean | null
    resolvedBy: string | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type FraudFlagCountAggregateOutputType = {
    id: number
    loanApplicationId: number
    riskScore: number
    flaggedBy: number
    reasons: number
    resolved: number
    resolvedBy: number
    resolvedAt: number
    createdAt: number
    _all: number
  }


  export type FraudFlagAvgAggregateInputType = {
    riskScore?: true
  }

  export type FraudFlagSumAggregateInputType = {
    riskScore?: true
  }

  export type FraudFlagMinAggregateInputType = {
    id?: true
    loanApplicationId?: true
    riskScore?: true
    flaggedBy?: true
    resolved?: true
    resolvedBy?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type FraudFlagMaxAggregateInputType = {
    id?: true
    loanApplicationId?: true
    riskScore?: true
    flaggedBy?: true
    resolved?: true
    resolvedBy?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type FraudFlagCountAggregateInputType = {
    id?: true
    loanApplicationId?: true
    riskScore?: true
    flaggedBy?: true
    reasons?: true
    resolved?: true
    resolvedBy?: true
    resolvedAt?: true
    createdAt?: true
    _all?: true
  }

  export type FraudFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FraudFlag to aggregate.
     */
    where?: FraudFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FraudFlags to fetch.
     */
    orderBy?: FraudFlagOrderByWithRelationInput | FraudFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FraudFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FraudFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FraudFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FraudFlags
    **/
    _count?: true | FraudFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FraudFlagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FraudFlagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FraudFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FraudFlagMaxAggregateInputType
  }

  export type GetFraudFlagAggregateType<T extends FraudFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateFraudFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFraudFlag[P]>
      : GetScalarType<T[P], AggregateFraudFlag[P]>
  }




  export type FraudFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FraudFlagWhereInput
    orderBy?: FraudFlagOrderByWithAggregationInput | FraudFlagOrderByWithAggregationInput[]
    by: FraudFlagScalarFieldEnum[] | FraudFlagScalarFieldEnum
    having?: FraudFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FraudFlagCountAggregateInputType | true
    _avg?: FraudFlagAvgAggregateInputType
    _sum?: FraudFlagSumAggregateInputType
    _min?: FraudFlagMinAggregateInputType
    _max?: FraudFlagMaxAggregateInputType
  }

  export type FraudFlagGroupByOutputType = {
    id: string
    loanApplicationId: string
    riskScore: number
    flaggedBy: string
    reasons: string[]
    resolved: boolean
    resolvedBy: string | null
    resolvedAt: Date | null
    createdAt: Date
    _count: FraudFlagCountAggregateOutputType | null
    _avg: FraudFlagAvgAggregateOutputType | null
    _sum: FraudFlagSumAggregateOutputType | null
    _min: FraudFlagMinAggregateOutputType | null
    _max: FraudFlagMaxAggregateOutputType | null
  }

  type GetFraudFlagGroupByPayload<T extends FraudFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FraudFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FraudFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FraudFlagGroupByOutputType[P]>
            : GetScalarType<T[P], FraudFlagGroupByOutputType[P]>
        }
      >
    >


  export type FraudFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    flaggedBy?: boolean
    reasons?: boolean
    resolved?: boolean
    resolvedBy?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fraudFlag"]>

  export type FraudFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    flaggedBy?: boolean
    reasons?: boolean
    resolved?: boolean
    resolvedBy?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fraudFlag"]>

  export type FraudFlagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    flaggedBy?: boolean
    reasons?: boolean
    resolved?: boolean
    resolvedBy?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fraudFlag"]>

  export type FraudFlagSelectScalar = {
    id?: boolean
    loanApplicationId?: boolean
    riskScore?: boolean
    flaggedBy?: boolean
    reasons?: boolean
    resolved?: boolean
    resolvedBy?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
  }

  export type FraudFlagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanApplicationId" | "riskScore" | "flaggedBy" | "reasons" | "resolved" | "resolvedBy" | "resolvedAt" | "createdAt", ExtArgs["result"]["fraudFlag"]>
  export type FraudFlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type FraudFlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type FraudFlagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }

  export type $FraudFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FraudFlag"
    objects: {
      loanApplication: Prisma.$LoanApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanApplicationId: string
      riskScore: number
      flaggedBy: string
      reasons: string[]
      resolved: boolean
      resolvedBy: string | null
      resolvedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["fraudFlag"]>
    composites: {}
  }

  type FraudFlagGetPayload<S extends boolean | null | undefined | FraudFlagDefaultArgs> = $Result.GetResult<Prisma.$FraudFlagPayload, S>

  type FraudFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FraudFlagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FraudFlagCountAggregateInputType | true
    }

  export interface FraudFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FraudFlag'], meta: { name: 'FraudFlag' } }
    /**
     * Find zero or one FraudFlag that matches the filter.
     * @param {FraudFlagFindUniqueArgs} args - Arguments to find a FraudFlag
     * @example
     * // Get one FraudFlag
     * const fraudFlag = await prisma.fraudFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FraudFlagFindUniqueArgs>(args: SelectSubset<T, FraudFlagFindUniqueArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FraudFlag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FraudFlagFindUniqueOrThrowArgs} args - Arguments to find a FraudFlag
     * @example
     * // Get one FraudFlag
     * const fraudFlag = await prisma.fraudFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FraudFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, FraudFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FraudFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagFindFirstArgs} args - Arguments to find a FraudFlag
     * @example
     * // Get one FraudFlag
     * const fraudFlag = await prisma.fraudFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FraudFlagFindFirstArgs>(args?: SelectSubset<T, FraudFlagFindFirstArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FraudFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagFindFirstOrThrowArgs} args - Arguments to find a FraudFlag
     * @example
     * // Get one FraudFlag
     * const fraudFlag = await prisma.fraudFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FraudFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, FraudFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FraudFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FraudFlags
     * const fraudFlags = await prisma.fraudFlag.findMany()
     * 
     * // Get first 10 FraudFlags
     * const fraudFlags = await prisma.fraudFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fraudFlagWithIdOnly = await prisma.fraudFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FraudFlagFindManyArgs>(args?: SelectSubset<T, FraudFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FraudFlag.
     * @param {FraudFlagCreateArgs} args - Arguments to create a FraudFlag.
     * @example
     * // Create one FraudFlag
     * const FraudFlag = await prisma.fraudFlag.create({
     *   data: {
     *     // ... data to create a FraudFlag
     *   }
     * })
     * 
     */
    create<T extends FraudFlagCreateArgs>(args: SelectSubset<T, FraudFlagCreateArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FraudFlags.
     * @param {FraudFlagCreateManyArgs} args - Arguments to create many FraudFlags.
     * @example
     * // Create many FraudFlags
     * const fraudFlag = await prisma.fraudFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FraudFlagCreateManyArgs>(args?: SelectSubset<T, FraudFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FraudFlags and returns the data saved in the database.
     * @param {FraudFlagCreateManyAndReturnArgs} args - Arguments to create many FraudFlags.
     * @example
     * // Create many FraudFlags
     * const fraudFlag = await prisma.fraudFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FraudFlags and only return the `id`
     * const fraudFlagWithIdOnly = await prisma.fraudFlag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FraudFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, FraudFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FraudFlag.
     * @param {FraudFlagDeleteArgs} args - Arguments to delete one FraudFlag.
     * @example
     * // Delete one FraudFlag
     * const FraudFlag = await prisma.fraudFlag.delete({
     *   where: {
     *     // ... filter to delete one FraudFlag
     *   }
     * })
     * 
     */
    delete<T extends FraudFlagDeleteArgs>(args: SelectSubset<T, FraudFlagDeleteArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FraudFlag.
     * @param {FraudFlagUpdateArgs} args - Arguments to update one FraudFlag.
     * @example
     * // Update one FraudFlag
     * const fraudFlag = await prisma.fraudFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FraudFlagUpdateArgs>(args: SelectSubset<T, FraudFlagUpdateArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FraudFlags.
     * @param {FraudFlagDeleteManyArgs} args - Arguments to filter FraudFlags to delete.
     * @example
     * // Delete a few FraudFlags
     * const { count } = await prisma.fraudFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FraudFlagDeleteManyArgs>(args?: SelectSubset<T, FraudFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FraudFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FraudFlags
     * const fraudFlag = await prisma.fraudFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FraudFlagUpdateManyArgs>(args: SelectSubset<T, FraudFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FraudFlags and returns the data updated in the database.
     * @param {FraudFlagUpdateManyAndReturnArgs} args - Arguments to update many FraudFlags.
     * @example
     * // Update many FraudFlags
     * const fraudFlag = await prisma.fraudFlag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FraudFlags and only return the `id`
     * const fraudFlagWithIdOnly = await prisma.fraudFlag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FraudFlagUpdateManyAndReturnArgs>(args: SelectSubset<T, FraudFlagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FraudFlag.
     * @param {FraudFlagUpsertArgs} args - Arguments to update or create a FraudFlag.
     * @example
     * // Update or create a FraudFlag
     * const fraudFlag = await prisma.fraudFlag.upsert({
     *   create: {
     *     // ... data to create a FraudFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FraudFlag we want to update
     *   }
     * })
     */
    upsert<T extends FraudFlagUpsertArgs>(args: SelectSubset<T, FraudFlagUpsertArgs<ExtArgs>>): Prisma__FraudFlagClient<$Result.GetResult<Prisma.$FraudFlagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FraudFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagCountArgs} args - Arguments to filter FraudFlags to count.
     * @example
     * // Count the number of FraudFlags
     * const count = await prisma.fraudFlag.count({
     *   where: {
     *     // ... the filter for the FraudFlags we want to count
     *   }
     * })
    **/
    count<T extends FraudFlagCountArgs>(
      args?: Subset<T, FraudFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FraudFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FraudFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FraudFlagAggregateArgs>(args: Subset<T, FraudFlagAggregateArgs>): Prisma.PrismaPromise<GetFraudFlagAggregateType<T>>

    /**
     * Group by FraudFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FraudFlagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FraudFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FraudFlagGroupByArgs['orderBy'] }
        : { orderBy?: FraudFlagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FraudFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFraudFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FraudFlag model
   */
  readonly fields: FraudFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FraudFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FraudFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loanApplication<T extends LoanApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplicationDefaultArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FraudFlag model
   */
  interface FraudFlagFieldRefs {
    readonly id: FieldRef<"FraudFlag", 'String'>
    readonly loanApplicationId: FieldRef<"FraudFlag", 'String'>
    readonly riskScore: FieldRef<"FraudFlag", 'Int'>
    readonly flaggedBy: FieldRef<"FraudFlag", 'String'>
    readonly reasons: FieldRef<"FraudFlag", 'String[]'>
    readonly resolved: FieldRef<"FraudFlag", 'Boolean'>
    readonly resolvedBy: FieldRef<"FraudFlag", 'String'>
    readonly resolvedAt: FieldRef<"FraudFlag", 'DateTime'>
    readonly createdAt: FieldRef<"FraudFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FraudFlag findUnique
   */
  export type FraudFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * Filter, which FraudFlag to fetch.
     */
    where: FraudFlagWhereUniqueInput
  }

  /**
   * FraudFlag findUniqueOrThrow
   */
  export type FraudFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * Filter, which FraudFlag to fetch.
     */
    where: FraudFlagWhereUniqueInput
  }

  /**
   * FraudFlag findFirst
   */
  export type FraudFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * Filter, which FraudFlag to fetch.
     */
    where?: FraudFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FraudFlags to fetch.
     */
    orderBy?: FraudFlagOrderByWithRelationInput | FraudFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FraudFlags.
     */
    cursor?: FraudFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FraudFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FraudFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FraudFlags.
     */
    distinct?: FraudFlagScalarFieldEnum | FraudFlagScalarFieldEnum[]
  }

  /**
   * FraudFlag findFirstOrThrow
   */
  export type FraudFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * Filter, which FraudFlag to fetch.
     */
    where?: FraudFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FraudFlags to fetch.
     */
    orderBy?: FraudFlagOrderByWithRelationInput | FraudFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FraudFlags.
     */
    cursor?: FraudFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FraudFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FraudFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FraudFlags.
     */
    distinct?: FraudFlagScalarFieldEnum | FraudFlagScalarFieldEnum[]
  }

  /**
   * FraudFlag findMany
   */
  export type FraudFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * Filter, which FraudFlags to fetch.
     */
    where?: FraudFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FraudFlags to fetch.
     */
    orderBy?: FraudFlagOrderByWithRelationInput | FraudFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FraudFlags.
     */
    cursor?: FraudFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FraudFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FraudFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FraudFlags.
     */
    distinct?: FraudFlagScalarFieldEnum | FraudFlagScalarFieldEnum[]
  }

  /**
   * FraudFlag create
   */
  export type FraudFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * The data needed to create a FraudFlag.
     */
    data: XOR<FraudFlagCreateInput, FraudFlagUncheckedCreateInput>
  }

  /**
   * FraudFlag createMany
   */
  export type FraudFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FraudFlags.
     */
    data: FraudFlagCreateManyInput | FraudFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FraudFlag createManyAndReturn
   */
  export type FraudFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * The data used to create many FraudFlags.
     */
    data: FraudFlagCreateManyInput | FraudFlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FraudFlag update
   */
  export type FraudFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * The data needed to update a FraudFlag.
     */
    data: XOR<FraudFlagUpdateInput, FraudFlagUncheckedUpdateInput>
    /**
     * Choose, which FraudFlag to update.
     */
    where: FraudFlagWhereUniqueInput
  }

  /**
   * FraudFlag updateMany
   */
  export type FraudFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FraudFlags.
     */
    data: XOR<FraudFlagUpdateManyMutationInput, FraudFlagUncheckedUpdateManyInput>
    /**
     * Filter which FraudFlags to update
     */
    where?: FraudFlagWhereInput
    /**
     * Limit how many FraudFlags to update.
     */
    limit?: number
  }

  /**
   * FraudFlag updateManyAndReturn
   */
  export type FraudFlagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * The data used to update FraudFlags.
     */
    data: XOR<FraudFlagUpdateManyMutationInput, FraudFlagUncheckedUpdateManyInput>
    /**
     * Filter which FraudFlags to update
     */
    where?: FraudFlagWhereInput
    /**
     * Limit how many FraudFlags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FraudFlag upsert
   */
  export type FraudFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * The filter to search for the FraudFlag to update in case it exists.
     */
    where: FraudFlagWhereUniqueInput
    /**
     * In case the FraudFlag found by the `where` argument doesn't exist, create a new FraudFlag with this data.
     */
    create: XOR<FraudFlagCreateInput, FraudFlagUncheckedCreateInput>
    /**
     * In case the FraudFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FraudFlagUpdateInput, FraudFlagUncheckedUpdateInput>
  }

  /**
   * FraudFlag delete
   */
  export type FraudFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
    /**
     * Filter which FraudFlag to delete.
     */
    where: FraudFlagWhereUniqueInput
  }

  /**
   * FraudFlag deleteMany
   */
  export type FraudFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FraudFlags to delete
     */
    where?: FraudFlagWhereInput
    /**
     * Limit how many FraudFlags to delete.
     */
    limit?: number
  }

  /**
   * FraudFlag without action
   */
  export type FraudFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FraudFlag
     */
    select?: FraudFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FraudFlag
     */
    omit?: FraudFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FraudFlagInclude<ExtArgs> | null
  }


  /**
   * Model LoanDecision
   */

  export type AggregateLoanDecision = {
    _count: LoanDecisionCountAggregateOutputType | null
    _min: LoanDecisionMinAggregateOutputType | null
    _max: LoanDecisionMaxAggregateOutputType | null
  }

  export type LoanDecisionMinAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    officerId: string | null
    decision: string | null
    reason: string | null
    overrideReason: string | null
    decidedAt: Date | null
  }

  export type LoanDecisionMaxAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    officerId: string | null
    decision: string | null
    reason: string | null
    overrideReason: string | null
    decidedAt: Date | null
  }

  export type LoanDecisionCountAggregateOutputType = {
    id: number
    loanApplicationId: number
    officerId: number
    decision: number
    reason: number
    overrideReason: number
    decidedAt: number
    _all: number
  }


  export type LoanDecisionMinAggregateInputType = {
    id?: true
    loanApplicationId?: true
    officerId?: true
    decision?: true
    reason?: true
    overrideReason?: true
    decidedAt?: true
  }

  export type LoanDecisionMaxAggregateInputType = {
    id?: true
    loanApplicationId?: true
    officerId?: true
    decision?: true
    reason?: true
    overrideReason?: true
    decidedAt?: true
  }

  export type LoanDecisionCountAggregateInputType = {
    id?: true
    loanApplicationId?: true
    officerId?: true
    decision?: true
    reason?: true
    overrideReason?: true
    decidedAt?: true
    _all?: true
  }

  export type LoanDecisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanDecision to aggregate.
     */
    where?: LoanDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanDecisions to fetch.
     */
    orderBy?: LoanDecisionOrderByWithRelationInput | LoanDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoanDecisions
    **/
    _count?: true | LoanDecisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanDecisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanDecisionMaxAggregateInputType
  }

  export type GetLoanDecisionAggregateType<T extends LoanDecisionAggregateArgs> = {
        [P in keyof T & keyof AggregateLoanDecision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoanDecision[P]>
      : GetScalarType<T[P], AggregateLoanDecision[P]>
  }




  export type LoanDecisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanDecisionWhereInput
    orderBy?: LoanDecisionOrderByWithAggregationInput | LoanDecisionOrderByWithAggregationInput[]
    by: LoanDecisionScalarFieldEnum[] | LoanDecisionScalarFieldEnum
    having?: LoanDecisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanDecisionCountAggregateInputType | true
    _min?: LoanDecisionMinAggregateInputType
    _max?: LoanDecisionMaxAggregateInputType
  }

  export type LoanDecisionGroupByOutputType = {
    id: string
    loanApplicationId: string
    officerId: string
    decision: string
    reason: string | null
    overrideReason: string | null
    decidedAt: Date
    _count: LoanDecisionCountAggregateOutputType | null
    _min: LoanDecisionMinAggregateOutputType | null
    _max: LoanDecisionMaxAggregateOutputType | null
  }

  type GetLoanDecisionGroupByPayload<T extends LoanDecisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanDecisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanDecisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanDecisionGroupByOutputType[P]>
            : GetScalarType<T[P], LoanDecisionGroupByOutputType[P]>
        }
      >
    >


  export type LoanDecisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    officerId?: boolean
    decision?: boolean
    reason?: boolean
    overrideReason?: boolean
    decidedAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanDecision"]>

  export type LoanDecisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    officerId?: boolean
    decision?: boolean
    reason?: boolean
    overrideReason?: boolean
    decidedAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanDecision"]>

  export type LoanDecisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    officerId?: boolean
    decision?: boolean
    reason?: boolean
    overrideReason?: boolean
    decidedAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanDecision"]>

  export type LoanDecisionSelectScalar = {
    id?: boolean
    loanApplicationId?: boolean
    officerId?: boolean
    decision?: boolean
    reason?: boolean
    overrideReason?: boolean
    decidedAt?: boolean
  }

  export type LoanDecisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanApplicationId" | "officerId" | "decision" | "reason" | "overrideReason" | "decidedAt", ExtArgs["result"]["loanDecision"]>
  export type LoanDecisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type LoanDecisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type LoanDecisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }

  export type $LoanDecisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoanDecision"
    objects: {
      loanApplication: Prisma.$LoanApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanApplicationId: string
      officerId: string
      decision: string
      reason: string | null
      overrideReason: string | null
      decidedAt: Date
    }, ExtArgs["result"]["loanDecision"]>
    composites: {}
  }

  type LoanDecisionGetPayload<S extends boolean | null | undefined | LoanDecisionDefaultArgs> = $Result.GetResult<Prisma.$LoanDecisionPayload, S>

  type LoanDecisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanDecisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanDecisionCountAggregateInputType | true
    }

  export interface LoanDecisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoanDecision'], meta: { name: 'LoanDecision' } }
    /**
     * Find zero or one LoanDecision that matches the filter.
     * @param {LoanDecisionFindUniqueArgs} args - Arguments to find a LoanDecision
     * @example
     * // Get one LoanDecision
     * const loanDecision = await prisma.loanDecision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanDecisionFindUniqueArgs>(args: SelectSubset<T, LoanDecisionFindUniqueArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoanDecision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanDecisionFindUniqueOrThrowArgs} args - Arguments to find a LoanDecision
     * @example
     * // Get one LoanDecision
     * const loanDecision = await prisma.loanDecision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanDecisionFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanDecisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanDecision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionFindFirstArgs} args - Arguments to find a LoanDecision
     * @example
     * // Get one LoanDecision
     * const loanDecision = await prisma.loanDecision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanDecisionFindFirstArgs>(args?: SelectSubset<T, LoanDecisionFindFirstArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanDecision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionFindFirstOrThrowArgs} args - Arguments to find a LoanDecision
     * @example
     * // Get one LoanDecision
     * const loanDecision = await prisma.loanDecision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanDecisionFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanDecisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoanDecisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoanDecisions
     * const loanDecisions = await prisma.loanDecision.findMany()
     * 
     * // Get first 10 LoanDecisions
     * const loanDecisions = await prisma.loanDecision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanDecisionWithIdOnly = await prisma.loanDecision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanDecisionFindManyArgs>(args?: SelectSubset<T, LoanDecisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoanDecision.
     * @param {LoanDecisionCreateArgs} args - Arguments to create a LoanDecision.
     * @example
     * // Create one LoanDecision
     * const LoanDecision = await prisma.loanDecision.create({
     *   data: {
     *     // ... data to create a LoanDecision
     *   }
     * })
     * 
     */
    create<T extends LoanDecisionCreateArgs>(args: SelectSubset<T, LoanDecisionCreateArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoanDecisions.
     * @param {LoanDecisionCreateManyArgs} args - Arguments to create many LoanDecisions.
     * @example
     * // Create many LoanDecisions
     * const loanDecision = await prisma.loanDecision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanDecisionCreateManyArgs>(args?: SelectSubset<T, LoanDecisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoanDecisions and returns the data saved in the database.
     * @param {LoanDecisionCreateManyAndReturnArgs} args - Arguments to create many LoanDecisions.
     * @example
     * // Create many LoanDecisions
     * const loanDecision = await prisma.loanDecision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoanDecisions and only return the `id`
     * const loanDecisionWithIdOnly = await prisma.loanDecision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanDecisionCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanDecisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoanDecision.
     * @param {LoanDecisionDeleteArgs} args - Arguments to delete one LoanDecision.
     * @example
     * // Delete one LoanDecision
     * const LoanDecision = await prisma.loanDecision.delete({
     *   where: {
     *     // ... filter to delete one LoanDecision
     *   }
     * })
     * 
     */
    delete<T extends LoanDecisionDeleteArgs>(args: SelectSubset<T, LoanDecisionDeleteArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoanDecision.
     * @param {LoanDecisionUpdateArgs} args - Arguments to update one LoanDecision.
     * @example
     * // Update one LoanDecision
     * const loanDecision = await prisma.loanDecision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanDecisionUpdateArgs>(args: SelectSubset<T, LoanDecisionUpdateArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoanDecisions.
     * @param {LoanDecisionDeleteManyArgs} args - Arguments to filter LoanDecisions to delete.
     * @example
     * // Delete a few LoanDecisions
     * const { count } = await prisma.loanDecision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanDecisionDeleteManyArgs>(args?: SelectSubset<T, LoanDecisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanDecisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoanDecisions
     * const loanDecision = await prisma.loanDecision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanDecisionUpdateManyArgs>(args: SelectSubset<T, LoanDecisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanDecisions and returns the data updated in the database.
     * @param {LoanDecisionUpdateManyAndReturnArgs} args - Arguments to update many LoanDecisions.
     * @example
     * // Update many LoanDecisions
     * const loanDecision = await prisma.loanDecision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoanDecisions and only return the `id`
     * const loanDecisionWithIdOnly = await prisma.loanDecision.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanDecisionUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanDecisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoanDecision.
     * @param {LoanDecisionUpsertArgs} args - Arguments to update or create a LoanDecision.
     * @example
     * // Update or create a LoanDecision
     * const loanDecision = await prisma.loanDecision.upsert({
     *   create: {
     *     // ... data to create a LoanDecision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoanDecision we want to update
     *   }
     * })
     */
    upsert<T extends LoanDecisionUpsertArgs>(args: SelectSubset<T, LoanDecisionUpsertArgs<ExtArgs>>): Prisma__LoanDecisionClient<$Result.GetResult<Prisma.$LoanDecisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoanDecisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionCountArgs} args - Arguments to filter LoanDecisions to count.
     * @example
     * // Count the number of LoanDecisions
     * const count = await prisma.loanDecision.count({
     *   where: {
     *     // ... the filter for the LoanDecisions we want to count
     *   }
     * })
    **/
    count<T extends LoanDecisionCountArgs>(
      args?: Subset<T, LoanDecisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanDecisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoanDecision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanDecisionAggregateArgs>(args: Subset<T, LoanDecisionAggregateArgs>): Prisma.PrismaPromise<GetLoanDecisionAggregateType<T>>

    /**
     * Group by LoanDecision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanDecisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanDecisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanDecisionGroupByArgs['orderBy'] }
        : { orderBy?: LoanDecisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanDecisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanDecisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoanDecision model
   */
  readonly fields: LoanDecisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoanDecision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanDecisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loanApplication<T extends LoanApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplicationDefaultArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoanDecision model
   */
  interface LoanDecisionFieldRefs {
    readonly id: FieldRef<"LoanDecision", 'String'>
    readonly loanApplicationId: FieldRef<"LoanDecision", 'String'>
    readonly officerId: FieldRef<"LoanDecision", 'String'>
    readonly decision: FieldRef<"LoanDecision", 'String'>
    readonly reason: FieldRef<"LoanDecision", 'String'>
    readonly overrideReason: FieldRef<"LoanDecision", 'String'>
    readonly decidedAt: FieldRef<"LoanDecision", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoanDecision findUnique
   */
  export type LoanDecisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * Filter, which LoanDecision to fetch.
     */
    where: LoanDecisionWhereUniqueInput
  }

  /**
   * LoanDecision findUniqueOrThrow
   */
  export type LoanDecisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * Filter, which LoanDecision to fetch.
     */
    where: LoanDecisionWhereUniqueInput
  }

  /**
   * LoanDecision findFirst
   */
  export type LoanDecisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * Filter, which LoanDecision to fetch.
     */
    where?: LoanDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanDecisions to fetch.
     */
    orderBy?: LoanDecisionOrderByWithRelationInput | LoanDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanDecisions.
     */
    cursor?: LoanDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanDecisions.
     */
    distinct?: LoanDecisionScalarFieldEnum | LoanDecisionScalarFieldEnum[]
  }

  /**
   * LoanDecision findFirstOrThrow
   */
  export type LoanDecisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * Filter, which LoanDecision to fetch.
     */
    where?: LoanDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanDecisions to fetch.
     */
    orderBy?: LoanDecisionOrderByWithRelationInput | LoanDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanDecisions.
     */
    cursor?: LoanDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanDecisions.
     */
    distinct?: LoanDecisionScalarFieldEnum | LoanDecisionScalarFieldEnum[]
  }

  /**
   * LoanDecision findMany
   */
  export type LoanDecisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * Filter, which LoanDecisions to fetch.
     */
    where?: LoanDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanDecisions to fetch.
     */
    orderBy?: LoanDecisionOrderByWithRelationInput | LoanDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoanDecisions.
     */
    cursor?: LoanDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanDecisions.
     */
    distinct?: LoanDecisionScalarFieldEnum | LoanDecisionScalarFieldEnum[]
  }

  /**
   * LoanDecision create
   */
  export type LoanDecisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * The data needed to create a LoanDecision.
     */
    data: XOR<LoanDecisionCreateInput, LoanDecisionUncheckedCreateInput>
  }

  /**
   * LoanDecision createMany
   */
  export type LoanDecisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoanDecisions.
     */
    data: LoanDecisionCreateManyInput | LoanDecisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanDecision createManyAndReturn
   */
  export type LoanDecisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * The data used to create many LoanDecisions.
     */
    data: LoanDecisionCreateManyInput | LoanDecisionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoanDecision update
   */
  export type LoanDecisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * The data needed to update a LoanDecision.
     */
    data: XOR<LoanDecisionUpdateInput, LoanDecisionUncheckedUpdateInput>
    /**
     * Choose, which LoanDecision to update.
     */
    where: LoanDecisionWhereUniqueInput
  }

  /**
   * LoanDecision updateMany
   */
  export type LoanDecisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoanDecisions.
     */
    data: XOR<LoanDecisionUpdateManyMutationInput, LoanDecisionUncheckedUpdateManyInput>
    /**
     * Filter which LoanDecisions to update
     */
    where?: LoanDecisionWhereInput
    /**
     * Limit how many LoanDecisions to update.
     */
    limit?: number
  }

  /**
   * LoanDecision updateManyAndReturn
   */
  export type LoanDecisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * The data used to update LoanDecisions.
     */
    data: XOR<LoanDecisionUpdateManyMutationInput, LoanDecisionUncheckedUpdateManyInput>
    /**
     * Filter which LoanDecisions to update
     */
    where?: LoanDecisionWhereInput
    /**
     * Limit how many LoanDecisions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoanDecision upsert
   */
  export type LoanDecisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * The filter to search for the LoanDecision to update in case it exists.
     */
    where: LoanDecisionWhereUniqueInput
    /**
     * In case the LoanDecision found by the `where` argument doesn't exist, create a new LoanDecision with this data.
     */
    create: XOR<LoanDecisionCreateInput, LoanDecisionUncheckedCreateInput>
    /**
     * In case the LoanDecision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanDecisionUpdateInput, LoanDecisionUncheckedUpdateInput>
  }

  /**
   * LoanDecision delete
   */
  export type LoanDecisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
    /**
     * Filter which LoanDecision to delete.
     */
    where: LoanDecisionWhereUniqueInput
  }

  /**
   * LoanDecision deleteMany
   */
  export type LoanDecisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanDecisions to delete
     */
    where?: LoanDecisionWhereInput
    /**
     * Limit how many LoanDecisions to delete.
     */
    limit?: number
  }

  /**
   * LoanDecision without action
   */
  export type LoanDecisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanDecision
     */
    select?: LoanDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanDecision
     */
    omit?: LoanDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanDecisionInclude<ExtArgs> | null
  }


  /**
   * Model ComplianceReport
   */

  export type AggregateComplianceReport = {
    _count: ComplianceReportCountAggregateOutputType | null
    _avg: ComplianceReportAvgAggregateOutputType | null
    _sum: ComplianceReportSumAggregateOutputType | null
    _min: ComplianceReportMinAggregateOutputType | null
    _max: ComplianceReportMaxAggregateOutputType | null
  }

  export type ComplianceReportAvgAggregateOutputType = {
    riskScore: number | null
  }

  export type ComplianceReportSumAggregateOutputType = {
    riskScore: number | null
  }

  export type ComplianceReportMinAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    reportType: string | null
    riskScore: number | null
    reportedAt: Date | null
    status: string | null
    referenceNumber: string | null
    createdAt: Date | null
  }

  export type ComplianceReportMaxAggregateOutputType = {
    id: string | null
    loanApplicationId: string | null
    reportType: string | null
    riskScore: number | null
    reportedAt: Date | null
    status: string | null
    referenceNumber: string | null
    createdAt: Date | null
  }

  export type ComplianceReportCountAggregateOutputType = {
    id: number
    loanApplicationId: number
    reportType: number
    riskScore: number
    reportedAt: number
    status: number
    referenceNumber: number
    createdAt: number
    _all: number
  }


  export type ComplianceReportAvgAggregateInputType = {
    riskScore?: true
  }

  export type ComplianceReportSumAggregateInputType = {
    riskScore?: true
  }

  export type ComplianceReportMinAggregateInputType = {
    id?: true
    loanApplicationId?: true
    reportType?: true
    riskScore?: true
    reportedAt?: true
    status?: true
    referenceNumber?: true
    createdAt?: true
  }

  export type ComplianceReportMaxAggregateInputType = {
    id?: true
    loanApplicationId?: true
    reportType?: true
    riskScore?: true
    reportedAt?: true
    status?: true
    referenceNumber?: true
    createdAt?: true
  }

  export type ComplianceReportCountAggregateInputType = {
    id?: true
    loanApplicationId?: true
    reportType?: true
    riskScore?: true
    reportedAt?: true
    status?: true
    referenceNumber?: true
    createdAt?: true
    _all?: true
  }

  export type ComplianceReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceReport to aggregate.
     */
    where?: ComplianceReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceReports to fetch.
     */
    orderBy?: ComplianceReportOrderByWithRelationInput | ComplianceReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplianceReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplianceReports
    **/
    _count?: true | ComplianceReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplianceReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplianceReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplianceReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplianceReportMaxAggregateInputType
  }

  export type GetComplianceReportAggregateType<T extends ComplianceReportAggregateArgs> = {
        [P in keyof T & keyof AggregateComplianceReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplianceReport[P]>
      : GetScalarType<T[P], AggregateComplianceReport[P]>
  }




  export type ComplianceReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceReportWhereInput
    orderBy?: ComplianceReportOrderByWithAggregationInput | ComplianceReportOrderByWithAggregationInput[]
    by: ComplianceReportScalarFieldEnum[] | ComplianceReportScalarFieldEnum
    having?: ComplianceReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplianceReportCountAggregateInputType | true
    _avg?: ComplianceReportAvgAggregateInputType
    _sum?: ComplianceReportSumAggregateInputType
    _min?: ComplianceReportMinAggregateInputType
    _max?: ComplianceReportMaxAggregateInputType
  }

  export type ComplianceReportGroupByOutputType = {
    id: string
    loanApplicationId: string
    reportType: string
    riskScore: number
    reportedAt: Date
    status: string
    referenceNumber: string | null
    createdAt: Date
    _count: ComplianceReportCountAggregateOutputType | null
    _avg: ComplianceReportAvgAggregateOutputType | null
    _sum: ComplianceReportSumAggregateOutputType | null
    _min: ComplianceReportMinAggregateOutputType | null
    _max: ComplianceReportMaxAggregateOutputType | null
  }

  type GetComplianceReportGroupByPayload<T extends ComplianceReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplianceReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplianceReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplianceReportGroupByOutputType[P]>
            : GetScalarType<T[P], ComplianceReportGroupByOutputType[P]>
        }
      >
    >


  export type ComplianceReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    reportType?: boolean
    riskScore?: boolean
    reportedAt?: boolean
    status?: boolean
    referenceNumber?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceReport"]>

  export type ComplianceReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    reportType?: boolean
    riskScore?: boolean
    reportedAt?: boolean
    status?: boolean
    referenceNumber?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceReport"]>

  export type ComplianceReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanApplicationId?: boolean
    reportType?: boolean
    riskScore?: boolean
    reportedAt?: boolean
    status?: boolean
    referenceNumber?: boolean
    createdAt?: boolean
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceReport"]>

  export type ComplianceReportSelectScalar = {
    id?: boolean
    loanApplicationId?: boolean
    reportType?: boolean
    riskScore?: boolean
    reportedAt?: boolean
    status?: boolean
    referenceNumber?: boolean
    createdAt?: boolean
  }

  export type ComplianceReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanApplicationId" | "reportType" | "riskScore" | "reportedAt" | "status" | "referenceNumber" | "createdAt", ExtArgs["result"]["complianceReport"]>
  export type ComplianceReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type ComplianceReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }
  export type ComplianceReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loanApplication?: boolean | LoanApplicationDefaultArgs<ExtArgs>
  }

  export type $ComplianceReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplianceReport"
    objects: {
      loanApplication: Prisma.$LoanApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanApplicationId: string
      reportType: string
      riskScore: number
      reportedAt: Date
      status: string
      referenceNumber: string | null
      createdAt: Date
    }, ExtArgs["result"]["complianceReport"]>
    composites: {}
  }

  type ComplianceReportGetPayload<S extends boolean | null | undefined | ComplianceReportDefaultArgs> = $Result.GetResult<Prisma.$ComplianceReportPayload, S>

  type ComplianceReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplianceReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplianceReportCountAggregateInputType | true
    }

  export interface ComplianceReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplianceReport'], meta: { name: 'ComplianceReport' } }
    /**
     * Find zero or one ComplianceReport that matches the filter.
     * @param {ComplianceReportFindUniqueArgs} args - Arguments to find a ComplianceReport
     * @example
     * // Get one ComplianceReport
     * const complianceReport = await prisma.complianceReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplianceReportFindUniqueArgs>(args: SelectSubset<T, ComplianceReportFindUniqueArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplianceReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplianceReportFindUniqueOrThrowArgs} args - Arguments to find a ComplianceReport
     * @example
     * // Get one ComplianceReport
     * const complianceReport = await prisma.complianceReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplianceReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplianceReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplianceReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportFindFirstArgs} args - Arguments to find a ComplianceReport
     * @example
     * // Get one ComplianceReport
     * const complianceReport = await prisma.complianceReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplianceReportFindFirstArgs>(args?: SelectSubset<T, ComplianceReportFindFirstArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplianceReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportFindFirstOrThrowArgs} args - Arguments to find a ComplianceReport
     * @example
     * // Get one ComplianceReport
     * const complianceReport = await prisma.complianceReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplianceReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplianceReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplianceReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplianceReports
     * const complianceReports = await prisma.complianceReport.findMany()
     * 
     * // Get first 10 ComplianceReports
     * const complianceReports = await prisma.complianceReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complianceReportWithIdOnly = await prisma.complianceReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplianceReportFindManyArgs>(args?: SelectSubset<T, ComplianceReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplianceReport.
     * @param {ComplianceReportCreateArgs} args - Arguments to create a ComplianceReport.
     * @example
     * // Create one ComplianceReport
     * const ComplianceReport = await prisma.complianceReport.create({
     *   data: {
     *     // ... data to create a ComplianceReport
     *   }
     * })
     * 
     */
    create<T extends ComplianceReportCreateArgs>(args: SelectSubset<T, ComplianceReportCreateArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplianceReports.
     * @param {ComplianceReportCreateManyArgs} args - Arguments to create many ComplianceReports.
     * @example
     * // Create many ComplianceReports
     * const complianceReport = await prisma.complianceReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplianceReportCreateManyArgs>(args?: SelectSubset<T, ComplianceReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplianceReports and returns the data saved in the database.
     * @param {ComplianceReportCreateManyAndReturnArgs} args - Arguments to create many ComplianceReports.
     * @example
     * // Create many ComplianceReports
     * const complianceReport = await prisma.complianceReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplianceReports and only return the `id`
     * const complianceReportWithIdOnly = await prisma.complianceReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplianceReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplianceReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplianceReport.
     * @param {ComplianceReportDeleteArgs} args - Arguments to delete one ComplianceReport.
     * @example
     * // Delete one ComplianceReport
     * const ComplianceReport = await prisma.complianceReport.delete({
     *   where: {
     *     // ... filter to delete one ComplianceReport
     *   }
     * })
     * 
     */
    delete<T extends ComplianceReportDeleteArgs>(args: SelectSubset<T, ComplianceReportDeleteArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplianceReport.
     * @param {ComplianceReportUpdateArgs} args - Arguments to update one ComplianceReport.
     * @example
     * // Update one ComplianceReport
     * const complianceReport = await prisma.complianceReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplianceReportUpdateArgs>(args: SelectSubset<T, ComplianceReportUpdateArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplianceReports.
     * @param {ComplianceReportDeleteManyArgs} args - Arguments to filter ComplianceReports to delete.
     * @example
     * // Delete a few ComplianceReports
     * const { count } = await prisma.complianceReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplianceReportDeleteManyArgs>(args?: SelectSubset<T, ComplianceReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplianceReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplianceReports
     * const complianceReport = await prisma.complianceReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplianceReportUpdateManyArgs>(args: SelectSubset<T, ComplianceReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplianceReports and returns the data updated in the database.
     * @param {ComplianceReportUpdateManyAndReturnArgs} args - Arguments to update many ComplianceReports.
     * @example
     * // Update many ComplianceReports
     * const complianceReport = await prisma.complianceReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplianceReports and only return the `id`
     * const complianceReportWithIdOnly = await prisma.complianceReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplianceReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplianceReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplianceReport.
     * @param {ComplianceReportUpsertArgs} args - Arguments to update or create a ComplianceReport.
     * @example
     * // Update or create a ComplianceReport
     * const complianceReport = await prisma.complianceReport.upsert({
     *   create: {
     *     // ... data to create a ComplianceReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplianceReport we want to update
     *   }
     * })
     */
    upsert<T extends ComplianceReportUpsertArgs>(args: SelectSubset<T, ComplianceReportUpsertArgs<ExtArgs>>): Prisma__ComplianceReportClient<$Result.GetResult<Prisma.$ComplianceReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplianceReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportCountArgs} args - Arguments to filter ComplianceReports to count.
     * @example
     * // Count the number of ComplianceReports
     * const count = await prisma.complianceReport.count({
     *   where: {
     *     // ... the filter for the ComplianceReports we want to count
     *   }
     * })
    **/
    count<T extends ComplianceReportCountArgs>(
      args?: Subset<T, ComplianceReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplianceReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplianceReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplianceReportAggregateArgs>(args: Subset<T, ComplianceReportAggregateArgs>): Prisma.PrismaPromise<GetComplianceReportAggregateType<T>>

    /**
     * Group by ComplianceReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplianceReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplianceReportGroupByArgs['orderBy'] }
        : { orderBy?: ComplianceReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplianceReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplianceReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplianceReport model
   */
  readonly fields: ComplianceReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplianceReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplianceReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loanApplication<T extends LoanApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplicationDefaultArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplianceReport model
   */
  interface ComplianceReportFieldRefs {
    readonly id: FieldRef<"ComplianceReport", 'String'>
    readonly loanApplicationId: FieldRef<"ComplianceReport", 'String'>
    readonly reportType: FieldRef<"ComplianceReport", 'String'>
    readonly riskScore: FieldRef<"ComplianceReport", 'Int'>
    readonly reportedAt: FieldRef<"ComplianceReport", 'DateTime'>
    readonly status: FieldRef<"ComplianceReport", 'String'>
    readonly referenceNumber: FieldRef<"ComplianceReport", 'String'>
    readonly createdAt: FieldRef<"ComplianceReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplianceReport findUnique
   */
  export type ComplianceReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceReport to fetch.
     */
    where: ComplianceReportWhereUniqueInput
  }

  /**
   * ComplianceReport findUniqueOrThrow
   */
  export type ComplianceReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceReport to fetch.
     */
    where: ComplianceReportWhereUniqueInput
  }

  /**
   * ComplianceReport findFirst
   */
  export type ComplianceReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceReport to fetch.
     */
    where?: ComplianceReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceReports to fetch.
     */
    orderBy?: ComplianceReportOrderByWithRelationInput | ComplianceReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceReports.
     */
    cursor?: ComplianceReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceReports.
     */
    distinct?: ComplianceReportScalarFieldEnum | ComplianceReportScalarFieldEnum[]
  }

  /**
   * ComplianceReport findFirstOrThrow
   */
  export type ComplianceReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceReport to fetch.
     */
    where?: ComplianceReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceReports to fetch.
     */
    orderBy?: ComplianceReportOrderByWithRelationInput | ComplianceReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceReports.
     */
    cursor?: ComplianceReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceReports.
     */
    distinct?: ComplianceReportScalarFieldEnum | ComplianceReportScalarFieldEnum[]
  }

  /**
   * ComplianceReport findMany
   */
  export type ComplianceReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceReports to fetch.
     */
    where?: ComplianceReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceReports to fetch.
     */
    orderBy?: ComplianceReportOrderByWithRelationInput | ComplianceReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplianceReports.
     */
    cursor?: ComplianceReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceReports.
     */
    distinct?: ComplianceReportScalarFieldEnum | ComplianceReportScalarFieldEnum[]
  }

  /**
   * ComplianceReport create
   */
  export type ComplianceReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplianceReport.
     */
    data: XOR<ComplianceReportCreateInput, ComplianceReportUncheckedCreateInput>
  }

  /**
   * ComplianceReport createMany
   */
  export type ComplianceReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplianceReports.
     */
    data: ComplianceReportCreateManyInput | ComplianceReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceReport createManyAndReturn
   */
  export type ComplianceReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * The data used to create many ComplianceReports.
     */
    data: ComplianceReportCreateManyInput | ComplianceReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplianceReport update
   */
  export type ComplianceReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplianceReport.
     */
    data: XOR<ComplianceReportUpdateInput, ComplianceReportUncheckedUpdateInput>
    /**
     * Choose, which ComplianceReport to update.
     */
    where: ComplianceReportWhereUniqueInput
  }

  /**
   * ComplianceReport updateMany
   */
  export type ComplianceReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplianceReports.
     */
    data: XOR<ComplianceReportUpdateManyMutationInput, ComplianceReportUncheckedUpdateManyInput>
    /**
     * Filter which ComplianceReports to update
     */
    where?: ComplianceReportWhereInput
    /**
     * Limit how many ComplianceReports to update.
     */
    limit?: number
  }

  /**
   * ComplianceReport updateManyAndReturn
   */
  export type ComplianceReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * The data used to update ComplianceReports.
     */
    data: XOR<ComplianceReportUpdateManyMutationInput, ComplianceReportUncheckedUpdateManyInput>
    /**
     * Filter which ComplianceReports to update
     */
    where?: ComplianceReportWhereInput
    /**
     * Limit how many ComplianceReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplianceReport upsert
   */
  export type ComplianceReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplianceReport to update in case it exists.
     */
    where: ComplianceReportWhereUniqueInput
    /**
     * In case the ComplianceReport found by the `where` argument doesn't exist, create a new ComplianceReport with this data.
     */
    create: XOR<ComplianceReportCreateInput, ComplianceReportUncheckedCreateInput>
    /**
     * In case the ComplianceReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplianceReportUpdateInput, ComplianceReportUncheckedUpdateInput>
  }

  /**
   * ComplianceReport delete
   */
  export type ComplianceReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
    /**
     * Filter which ComplianceReport to delete.
     */
    where: ComplianceReportWhereUniqueInput
  }

  /**
   * ComplianceReport deleteMany
   */
  export type ComplianceReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceReports to delete
     */
    where?: ComplianceReportWhereInput
    /**
     * Limit how many ComplianceReports to delete.
     */
    limit?: number
  }

  /**
   * ComplianceReport without action
   */
  export type ComplianceReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceReport
     */
    select?: ComplianceReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplianceReport
     */
    omit?: ComplianceReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LoanApplicationScalarFieldEnum: {
    id: 'id',
    applicationNumber: 'applicationNumber',
    applicantName: 'applicantName',
    applicantEmail: 'applicantEmail',
    applicantPhone: 'applicantPhone',
    loanAmountRequested: 'loanAmountRequested',
    loanType: 'loanType',
    status: 'status',
    analysisStatus: 'analysisStatus',
    analysisStartedAt: 'analysisStartedAt',
    analysisCompletedAt: 'analysisCompletedAt',
    analysisError: 'analysisError',
    documentsUploadedAt: 'documentsUploadedAt',
    currentRiskScore: 'currentRiskScore',
    recommendation: 'recommendation',
    officerId: 'officerId',
    branchCode: 'branchCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoanApplicationScalarFieldEnum = (typeof LoanApplicationScalarFieldEnum)[keyof typeof LoanApplicationScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    loanApplicationId: 'loanApplicationId',
    type: 'type',
    s3Key: 's3Key',
    s3Url: 's3Url',
    originalFilename: 'originalFilename',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    uploadedBy: 'uploadedBy',
    analysisStatus: 'analysisStatus',
    createdAt: 'createdAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentAnalysisScalarFieldEnum: {
    id: 'id',
    loanApplicationId: 'loanApplicationId',
    riskScore: 'riskScore',
    recommendation: 'recommendation',
    riskLevel: 'riskLevel',
    processingTimeMs: 'processingTimeMs',
    documentsResult: 'documentsResult',
    crossChecks: 'crossChecks',
    riskFactors: 'riskFactors',
    analyzedAt: 'analyzedAt',
    createdAt: 'createdAt'
  };

  export type DocumentAnalysisScalarFieldEnum = (typeof DocumentAnalysisScalarFieldEnum)[keyof typeof DocumentAnalysisScalarFieldEnum]


  export const FraudFlagScalarFieldEnum: {
    id: 'id',
    loanApplicationId: 'loanApplicationId',
    riskScore: 'riskScore',
    flaggedBy: 'flaggedBy',
    reasons: 'reasons',
    resolved: 'resolved',
    resolvedBy: 'resolvedBy',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt'
  };

  export type FraudFlagScalarFieldEnum = (typeof FraudFlagScalarFieldEnum)[keyof typeof FraudFlagScalarFieldEnum]


  export const LoanDecisionScalarFieldEnum: {
    id: 'id',
    loanApplicationId: 'loanApplicationId',
    officerId: 'officerId',
    decision: 'decision',
    reason: 'reason',
    overrideReason: 'overrideReason',
    decidedAt: 'decidedAt'
  };

  export type LoanDecisionScalarFieldEnum = (typeof LoanDecisionScalarFieldEnum)[keyof typeof LoanDecisionScalarFieldEnum]


  export const ComplianceReportScalarFieldEnum: {
    id: 'id',
    loanApplicationId: 'loanApplicationId',
    reportType: 'reportType',
    riskScore: 'riskScore',
    reportedAt: 'reportedAt',
    status: 'status',
    referenceNumber: 'referenceNumber',
    createdAt: 'createdAt'
  };

  export type ComplianceReportScalarFieldEnum = (typeof ComplianceReportScalarFieldEnum)[keyof typeof ComplianceReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'LoanType'
   */
  export type EnumLoanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanType'>
    


  /**
   * Reference to a field of type 'LoanType[]'
   */
  export type ListEnumLoanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanType[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'AnalysisStatus'
   */
  export type EnumAnalysisStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalysisStatus'>
    


  /**
   * Reference to a field of type 'AnalysisStatus[]'
   */
  export type ListEnumAnalysisStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalysisStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type LoanApplicationWhereInput = {
    AND?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    OR?: LoanApplicationWhereInput[]
    NOT?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    id?: StringFilter<"LoanApplication"> | string
    applicationNumber?: StringFilter<"LoanApplication"> | string
    applicantName?: StringFilter<"LoanApplication"> | string
    applicantEmail?: StringNullableFilter<"LoanApplication"> | string | null
    applicantPhone?: StringFilter<"LoanApplication"> | string
    loanAmountRequested?: FloatFilter<"LoanApplication"> | number
    loanType?: EnumLoanTypeFilter<"LoanApplication"> | $Enums.LoanType
    status?: EnumLoanStatusFilter<"LoanApplication"> | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFilter<"LoanApplication"> | $Enums.AnalysisStatus
    analysisStartedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    analysisCompletedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    analysisError?: StringNullableFilter<"LoanApplication"> | string | null
    documentsUploadedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    currentRiskScore?: IntNullableFilter<"LoanApplication"> | number | null
    recommendation?: StringNullableFilter<"LoanApplication"> | string | null
    officerId?: StringNullableFilter<"LoanApplication"> | string | null
    branchCode?: StringNullableFilter<"LoanApplication"> | string | null
    createdAt?: DateTimeFilter<"LoanApplication"> | Date | string
    updatedAt?: DateTimeFilter<"LoanApplication"> | Date | string
    documents?: DocumentListRelationFilter
    analysis?: DocumentAnalysisListRelationFilter
    fraudFlags?: FraudFlagListRelationFilter
    complianceReports?: ComplianceReportListRelationFilter
    decision?: XOR<LoanDecisionNullableScalarRelationFilter, LoanDecisionWhereInput> | null
  }

  export type LoanApplicationOrderByWithRelationInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    applicantName?: SortOrder
    applicantEmail?: SortOrderInput | SortOrder
    applicantPhone?: SortOrder
    loanAmountRequested?: SortOrder
    loanType?: SortOrder
    status?: SortOrder
    analysisStatus?: SortOrder
    analysisStartedAt?: SortOrderInput | SortOrder
    analysisCompletedAt?: SortOrderInput | SortOrder
    analysisError?: SortOrderInput | SortOrder
    documentsUploadedAt?: SortOrderInput | SortOrder
    currentRiskScore?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    officerId?: SortOrderInput | SortOrder
    branchCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    analysis?: DocumentAnalysisOrderByRelationAggregateInput
    fraudFlags?: FraudFlagOrderByRelationAggregateInput
    complianceReports?: ComplianceReportOrderByRelationAggregateInput
    decision?: LoanDecisionOrderByWithRelationInput
  }

  export type LoanApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    applicationNumber?: string
    AND?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    OR?: LoanApplicationWhereInput[]
    NOT?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    applicantName?: StringFilter<"LoanApplication"> | string
    applicantEmail?: StringNullableFilter<"LoanApplication"> | string | null
    applicantPhone?: StringFilter<"LoanApplication"> | string
    loanAmountRequested?: FloatFilter<"LoanApplication"> | number
    loanType?: EnumLoanTypeFilter<"LoanApplication"> | $Enums.LoanType
    status?: EnumLoanStatusFilter<"LoanApplication"> | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFilter<"LoanApplication"> | $Enums.AnalysisStatus
    analysisStartedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    analysisCompletedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    analysisError?: StringNullableFilter<"LoanApplication"> | string | null
    documentsUploadedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    currentRiskScore?: IntNullableFilter<"LoanApplication"> | number | null
    recommendation?: StringNullableFilter<"LoanApplication"> | string | null
    officerId?: StringNullableFilter<"LoanApplication"> | string | null
    branchCode?: StringNullableFilter<"LoanApplication"> | string | null
    createdAt?: DateTimeFilter<"LoanApplication"> | Date | string
    updatedAt?: DateTimeFilter<"LoanApplication"> | Date | string
    documents?: DocumentListRelationFilter
    analysis?: DocumentAnalysisListRelationFilter
    fraudFlags?: FraudFlagListRelationFilter
    complianceReports?: ComplianceReportListRelationFilter
    decision?: XOR<LoanDecisionNullableScalarRelationFilter, LoanDecisionWhereInput> | null
  }, "id" | "applicationNumber">

  export type LoanApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    applicantName?: SortOrder
    applicantEmail?: SortOrderInput | SortOrder
    applicantPhone?: SortOrder
    loanAmountRequested?: SortOrder
    loanType?: SortOrder
    status?: SortOrder
    analysisStatus?: SortOrder
    analysisStartedAt?: SortOrderInput | SortOrder
    analysisCompletedAt?: SortOrderInput | SortOrder
    analysisError?: SortOrderInput | SortOrder
    documentsUploadedAt?: SortOrderInput | SortOrder
    currentRiskScore?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    officerId?: SortOrderInput | SortOrder
    branchCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoanApplicationCountOrderByAggregateInput
    _avg?: LoanApplicationAvgOrderByAggregateInput
    _max?: LoanApplicationMaxOrderByAggregateInput
    _min?: LoanApplicationMinOrderByAggregateInput
    _sum?: LoanApplicationSumOrderByAggregateInput
  }

  export type LoanApplicationScalarWhereWithAggregatesInput = {
    AND?: LoanApplicationScalarWhereWithAggregatesInput | LoanApplicationScalarWhereWithAggregatesInput[]
    OR?: LoanApplicationScalarWhereWithAggregatesInput[]
    NOT?: LoanApplicationScalarWhereWithAggregatesInput | LoanApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoanApplication"> | string
    applicationNumber?: StringWithAggregatesFilter<"LoanApplication"> | string
    applicantName?: StringWithAggregatesFilter<"LoanApplication"> | string
    applicantEmail?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    applicantPhone?: StringWithAggregatesFilter<"LoanApplication"> | string
    loanAmountRequested?: FloatWithAggregatesFilter<"LoanApplication"> | number
    loanType?: EnumLoanTypeWithAggregatesFilter<"LoanApplication"> | $Enums.LoanType
    status?: EnumLoanStatusWithAggregatesFilter<"LoanApplication"> | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusWithAggregatesFilter<"LoanApplication"> | $Enums.AnalysisStatus
    analysisStartedAt?: DateTimeNullableWithAggregatesFilter<"LoanApplication"> | Date | string | null
    analysisCompletedAt?: DateTimeNullableWithAggregatesFilter<"LoanApplication"> | Date | string | null
    analysisError?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    documentsUploadedAt?: DateTimeNullableWithAggregatesFilter<"LoanApplication"> | Date | string | null
    currentRiskScore?: IntNullableWithAggregatesFilter<"LoanApplication"> | number | null
    recommendation?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    officerId?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    branchCode?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LoanApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoanApplication"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    loanApplicationId?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    s3Key?: StringFilter<"Document"> | string
    s3Url?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    sizeBytes?: IntFilter<"Document"> | number
    uploadedBy?: StringFilter<"Document"> | string
    analysisStatus?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    type?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    analysisStatus?: SortOrder
    createdAt?: SortOrder
    loanApplication?: LoanApplicationOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    loanApplicationId?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    s3Key?: StringFilter<"Document"> | string
    s3Url?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    sizeBytes?: IntFilter<"Document"> | number
    uploadedBy?: StringFilter<"Document"> | string
    analysisStatus?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    type?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    analysisStatus?: SortOrder
    createdAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    loanApplicationId?: StringWithAggregatesFilter<"Document"> | string
    type?: EnumDocumentTypeWithAggregatesFilter<"Document"> | $Enums.DocumentType
    s3Key?: StringWithAggregatesFilter<"Document"> | string
    s3Url?: StringWithAggregatesFilter<"Document"> | string
    originalFilename?: StringWithAggregatesFilter<"Document"> | string
    mimeType?: StringWithAggregatesFilter<"Document"> | string
    sizeBytes?: IntWithAggregatesFilter<"Document"> | number
    uploadedBy?: StringWithAggregatesFilter<"Document"> | string
    analysisStatus?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type DocumentAnalysisWhereInput = {
    AND?: DocumentAnalysisWhereInput | DocumentAnalysisWhereInput[]
    OR?: DocumentAnalysisWhereInput[]
    NOT?: DocumentAnalysisWhereInput | DocumentAnalysisWhereInput[]
    id?: StringFilter<"DocumentAnalysis"> | string
    loanApplicationId?: StringFilter<"DocumentAnalysis"> | string
    riskScore?: IntFilter<"DocumentAnalysis"> | number
    recommendation?: StringFilter<"DocumentAnalysis"> | string
    riskLevel?: StringFilter<"DocumentAnalysis"> | string
    processingTimeMs?: IntFilter<"DocumentAnalysis"> | number
    documentsResult?: JsonFilter<"DocumentAnalysis">
    crossChecks?: JsonFilter<"DocumentAnalysis">
    riskFactors?: JsonFilter<"DocumentAnalysis">
    analyzedAt?: DateTimeFilter<"DocumentAnalysis"> | Date | string
    createdAt?: DateTimeFilter<"DocumentAnalysis"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }

  export type DocumentAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    recommendation?: SortOrder
    riskLevel?: SortOrder
    processingTimeMs?: SortOrder
    documentsResult?: SortOrder
    crossChecks?: SortOrder
    riskFactors?: SortOrder
    analyzedAt?: SortOrder
    createdAt?: SortOrder
    loanApplication?: LoanApplicationOrderByWithRelationInput
  }

  export type DocumentAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentAnalysisWhereInput | DocumentAnalysisWhereInput[]
    OR?: DocumentAnalysisWhereInput[]
    NOT?: DocumentAnalysisWhereInput | DocumentAnalysisWhereInput[]
    loanApplicationId?: StringFilter<"DocumentAnalysis"> | string
    riskScore?: IntFilter<"DocumentAnalysis"> | number
    recommendation?: StringFilter<"DocumentAnalysis"> | string
    riskLevel?: StringFilter<"DocumentAnalysis"> | string
    processingTimeMs?: IntFilter<"DocumentAnalysis"> | number
    documentsResult?: JsonFilter<"DocumentAnalysis">
    crossChecks?: JsonFilter<"DocumentAnalysis">
    riskFactors?: JsonFilter<"DocumentAnalysis">
    analyzedAt?: DateTimeFilter<"DocumentAnalysis"> | Date | string
    createdAt?: DateTimeFilter<"DocumentAnalysis"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }, "id">

  export type DocumentAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    recommendation?: SortOrder
    riskLevel?: SortOrder
    processingTimeMs?: SortOrder
    documentsResult?: SortOrder
    crossChecks?: SortOrder
    riskFactors?: SortOrder
    analyzedAt?: SortOrder
    createdAt?: SortOrder
    _count?: DocumentAnalysisCountOrderByAggregateInput
    _avg?: DocumentAnalysisAvgOrderByAggregateInput
    _max?: DocumentAnalysisMaxOrderByAggregateInput
    _min?: DocumentAnalysisMinOrderByAggregateInput
    _sum?: DocumentAnalysisSumOrderByAggregateInput
  }

  export type DocumentAnalysisScalarWhereWithAggregatesInput = {
    AND?: DocumentAnalysisScalarWhereWithAggregatesInput | DocumentAnalysisScalarWhereWithAggregatesInput[]
    OR?: DocumentAnalysisScalarWhereWithAggregatesInput[]
    NOT?: DocumentAnalysisScalarWhereWithAggregatesInput | DocumentAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentAnalysis"> | string
    loanApplicationId?: StringWithAggregatesFilter<"DocumentAnalysis"> | string
    riskScore?: IntWithAggregatesFilter<"DocumentAnalysis"> | number
    recommendation?: StringWithAggregatesFilter<"DocumentAnalysis"> | string
    riskLevel?: StringWithAggregatesFilter<"DocumentAnalysis"> | string
    processingTimeMs?: IntWithAggregatesFilter<"DocumentAnalysis"> | number
    documentsResult?: JsonWithAggregatesFilter<"DocumentAnalysis">
    crossChecks?: JsonWithAggregatesFilter<"DocumentAnalysis">
    riskFactors?: JsonWithAggregatesFilter<"DocumentAnalysis">
    analyzedAt?: DateTimeWithAggregatesFilter<"DocumentAnalysis"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"DocumentAnalysis"> | Date | string
  }

  export type FraudFlagWhereInput = {
    AND?: FraudFlagWhereInput | FraudFlagWhereInput[]
    OR?: FraudFlagWhereInput[]
    NOT?: FraudFlagWhereInput | FraudFlagWhereInput[]
    id?: StringFilter<"FraudFlag"> | string
    loanApplicationId?: StringFilter<"FraudFlag"> | string
    riskScore?: IntFilter<"FraudFlag"> | number
    flaggedBy?: StringFilter<"FraudFlag"> | string
    reasons?: StringNullableListFilter<"FraudFlag">
    resolved?: BoolFilter<"FraudFlag"> | boolean
    resolvedBy?: StringNullableFilter<"FraudFlag"> | string | null
    resolvedAt?: DateTimeNullableFilter<"FraudFlag"> | Date | string | null
    createdAt?: DateTimeFilter<"FraudFlag"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }

  export type FraudFlagOrderByWithRelationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    flaggedBy?: SortOrder
    reasons?: SortOrder
    resolved?: SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    loanApplication?: LoanApplicationOrderByWithRelationInput
  }

  export type FraudFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FraudFlagWhereInput | FraudFlagWhereInput[]
    OR?: FraudFlagWhereInput[]
    NOT?: FraudFlagWhereInput | FraudFlagWhereInput[]
    loanApplicationId?: StringFilter<"FraudFlag"> | string
    riskScore?: IntFilter<"FraudFlag"> | number
    flaggedBy?: StringFilter<"FraudFlag"> | string
    reasons?: StringNullableListFilter<"FraudFlag">
    resolved?: BoolFilter<"FraudFlag"> | boolean
    resolvedBy?: StringNullableFilter<"FraudFlag"> | string | null
    resolvedAt?: DateTimeNullableFilter<"FraudFlag"> | Date | string | null
    createdAt?: DateTimeFilter<"FraudFlag"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }, "id">

  export type FraudFlagOrderByWithAggregationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    flaggedBy?: SortOrder
    reasons?: SortOrder
    resolved?: SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FraudFlagCountOrderByAggregateInput
    _avg?: FraudFlagAvgOrderByAggregateInput
    _max?: FraudFlagMaxOrderByAggregateInput
    _min?: FraudFlagMinOrderByAggregateInput
    _sum?: FraudFlagSumOrderByAggregateInput
  }

  export type FraudFlagScalarWhereWithAggregatesInput = {
    AND?: FraudFlagScalarWhereWithAggregatesInput | FraudFlagScalarWhereWithAggregatesInput[]
    OR?: FraudFlagScalarWhereWithAggregatesInput[]
    NOT?: FraudFlagScalarWhereWithAggregatesInput | FraudFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FraudFlag"> | string
    loanApplicationId?: StringWithAggregatesFilter<"FraudFlag"> | string
    riskScore?: IntWithAggregatesFilter<"FraudFlag"> | number
    flaggedBy?: StringWithAggregatesFilter<"FraudFlag"> | string
    reasons?: StringNullableListFilter<"FraudFlag">
    resolved?: BoolWithAggregatesFilter<"FraudFlag"> | boolean
    resolvedBy?: StringNullableWithAggregatesFilter<"FraudFlag"> | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"FraudFlag"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FraudFlag"> | Date | string
  }

  export type LoanDecisionWhereInput = {
    AND?: LoanDecisionWhereInput | LoanDecisionWhereInput[]
    OR?: LoanDecisionWhereInput[]
    NOT?: LoanDecisionWhereInput | LoanDecisionWhereInput[]
    id?: StringFilter<"LoanDecision"> | string
    loanApplicationId?: StringFilter<"LoanDecision"> | string
    officerId?: StringFilter<"LoanDecision"> | string
    decision?: StringFilter<"LoanDecision"> | string
    reason?: StringNullableFilter<"LoanDecision"> | string | null
    overrideReason?: StringNullableFilter<"LoanDecision"> | string | null
    decidedAt?: DateTimeFilter<"LoanDecision"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }

  export type LoanDecisionOrderByWithRelationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    officerId?: SortOrder
    decision?: SortOrder
    reason?: SortOrderInput | SortOrder
    overrideReason?: SortOrderInput | SortOrder
    decidedAt?: SortOrder
    loanApplication?: LoanApplicationOrderByWithRelationInput
  }

  export type LoanDecisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    loanApplicationId?: string
    AND?: LoanDecisionWhereInput | LoanDecisionWhereInput[]
    OR?: LoanDecisionWhereInput[]
    NOT?: LoanDecisionWhereInput | LoanDecisionWhereInput[]
    officerId?: StringFilter<"LoanDecision"> | string
    decision?: StringFilter<"LoanDecision"> | string
    reason?: StringNullableFilter<"LoanDecision"> | string | null
    overrideReason?: StringNullableFilter<"LoanDecision"> | string | null
    decidedAt?: DateTimeFilter<"LoanDecision"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }, "id" | "loanApplicationId">

  export type LoanDecisionOrderByWithAggregationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    officerId?: SortOrder
    decision?: SortOrder
    reason?: SortOrderInput | SortOrder
    overrideReason?: SortOrderInput | SortOrder
    decidedAt?: SortOrder
    _count?: LoanDecisionCountOrderByAggregateInput
    _max?: LoanDecisionMaxOrderByAggregateInput
    _min?: LoanDecisionMinOrderByAggregateInput
  }

  export type LoanDecisionScalarWhereWithAggregatesInput = {
    AND?: LoanDecisionScalarWhereWithAggregatesInput | LoanDecisionScalarWhereWithAggregatesInput[]
    OR?: LoanDecisionScalarWhereWithAggregatesInput[]
    NOT?: LoanDecisionScalarWhereWithAggregatesInput | LoanDecisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoanDecision"> | string
    loanApplicationId?: StringWithAggregatesFilter<"LoanDecision"> | string
    officerId?: StringWithAggregatesFilter<"LoanDecision"> | string
    decision?: StringWithAggregatesFilter<"LoanDecision"> | string
    reason?: StringNullableWithAggregatesFilter<"LoanDecision"> | string | null
    overrideReason?: StringNullableWithAggregatesFilter<"LoanDecision"> | string | null
    decidedAt?: DateTimeWithAggregatesFilter<"LoanDecision"> | Date | string
  }

  export type ComplianceReportWhereInput = {
    AND?: ComplianceReportWhereInput | ComplianceReportWhereInput[]
    OR?: ComplianceReportWhereInput[]
    NOT?: ComplianceReportWhereInput | ComplianceReportWhereInput[]
    id?: StringFilter<"ComplianceReport"> | string
    loanApplicationId?: StringFilter<"ComplianceReport"> | string
    reportType?: StringFilter<"ComplianceReport"> | string
    riskScore?: IntFilter<"ComplianceReport"> | number
    reportedAt?: DateTimeFilter<"ComplianceReport"> | Date | string
    status?: StringFilter<"ComplianceReport"> | string
    referenceNumber?: StringNullableFilter<"ComplianceReport"> | string | null
    createdAt?: DateTimeFilter<"ComplianceReport"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }

  export type ComplianceReportOrderByWithRelationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    reportType?: SortOrder
    riskScore?: SortOrder
    reportedAt?: SortOrder
    status?: SortOrder
    referenceNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    loanApplication?: LoanApplicationOrderByWithRelationInput
  }

  export type ComplianceReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplianceReportWhereInput | ComplianceReportWhereInput[]
    OR?: ComplianceReportWhereInput[]
    NOT?: ComplianceReportWhereInput | ComplianceReportWhereInput[]
    loanApplicationId?: StringFilter<"ComplianceReport"> | string
    reportType?: StringFilter<"ComplianceReport"> | string
    riskScore?: IntFilter<"ComplianceReport"> | number
    reportedAt?: DateTimeFilter<"ComplianceReport"> | Date | string
    status?: StringFilter<"ComplianceReport"> | string
    referenceNumber?: StringNullableFilter<"ComplianceReport"> | string | null
    createdAt?: DateTimeFilter<"ComplianceReport"> | Date | string
    loanApplication?: XOR<LoanApplicationScalarRelationFilter, LoanApplicationWhereInput>
  }, "id">

  export type ComplianceReportOrderByWithAggregationInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    reportType?: SortOrder
    riskScore?: SortOrder
    reportedAt?: SortOrder
    status?: SortOrder
    referenceNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ComplianceReportCountOrderByAggregateInput
    _avg?: ComplianceReportAvgOrderByAggregateInput
    _max?: ComplianceReportMaxOrderByAggregateInput
    _min?: ComplianceReportMinOrderByAggregateInput
    _sum?: ComplianceReportSumOrderByAggregateInput
  }

  export type ComplianceReportScalarWhereWithAggregatesInput = {
    AND?: ComplianceReportScalarWhereWithAggregatesInput | ComplianceReportScalarWhereWithAggregatesInput[]
    OR?: ComplianceReportScalarWhereWithAggregatesInput[]
    NOT?: ComplianceReportScalarWhereWithAggregatesInput | ComplianceReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplianceReport"> | string
    loanApplicationId?: StringWithAggregatesFilter<"ComplianceReport"> | string
    reportType?: StringWithAggregatesFilter<"ComplianceReport"> | string
    riskScore?: IntWithAggregatesFilter<"ComplianceReport"> | number
    reportedAt?: DateTimeWithAggregatesFilter<"ComplianceReport"> | Date | string
    status?: StringWithAggregatesFilter<"ComplianceReport"> | string
    referenceNumber?: StringNullableWithAggregatesFilter<"ComplianceReport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ComplianceReport"> | Date | string
  }

  export type LoanApplicationCreateInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationUncheckedCreateInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisUncheckedCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagUncheckedCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportUncheckedCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionUncheckedCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUncheckedUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUncheckedUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUncheckedUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationCreateManyInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus?: string
    createdAt?: Date | string
    loanApplication: LoanApplicationCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    loanApplicationId: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus?: string
    createdAt?: Date | string
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loanApplication?: LoanApplicationUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyInput = {
    id?: string
    loanApplicationId: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus?: string
    createdAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAnalysisCreateInput = {
    id?: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonNullValueInput | InputJsonValue
    crossChecks: JsonNullValueInput | InputJsonValue
    riskFactors: JsonNullValueInput | InputJsonValue
    analyzedAt: Date | string
    createdAt?: Date | string
    loanApplication: LoanApplicationCreateNestedOneWithoutAnalysisInput
  }

  export type DocumentAnalysisUncheckedCreateInput = {
    id?: string
    loanApplicationId: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonNullValueInput | InputJsonValue
    crossChecks: JsonNullValueInput | InputJsonValue
    riskFactors: JsonNullValueInput | InputJsonValue
    analyzedAt: Date | string
    createdAt?: Date | string
  }

  export type DocumentAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loanApplication?: LoanApplicationUpdateOneRequiredWithoutAnalysisNestedInput
  }

  export type DocumentAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAnalysisCreateManyInput = {
    id?: string
    loanApplicationId: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonNullValueInput | InputJsonValue
    crossChecks: JsonNullValueInput | InputJsonValue
    riskFactors: JsonNullValueInput | InputJsonValue
    analyzedAt: Date | string
    createdAt?: Date | string
  }

  export type DocumentAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FraudFlagCreateInput = {
    id?: string
    riskScore: number
    flaggedBy: string
    reasons?: FraudFlagCreatereasonsInput | string[]
    resolved?: boolean
    resolvedBy?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    loanApplication: LoanApplicationCreateNestedOneWithoutFraudFlagsInput
  }

  export type FraudFlagUncheckedCreateInput = {
    id?: string
    loanApplicationId: string
    riskScore: number
    flaggedBy: string
    reasons?: FraudFlagCreatereasonsInput | string[]
    resolved?: boolean
    resolvedBy?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FraudFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loanApplication?: LoanApplicationUpdateOneRequiredWithoutFraudFlagsNestedInput
  }

  export type FraudFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FraudFlagCreateManyInput = {
    id?: string
    loanApplicationId: string
    riskScore: number
    flaggedBy: string
    reasons?: FraudFlagCreatereasonsInput | string[]
    resolved?: boolean
    resolvedBy?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FraudFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FraudFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanDecisionCreateInput = {
    id?: string
    officerId: string
    decision: string
    reason?: string | null
    overrideReason?: string | null
    decidedAt?: Date | string
    loanApplication: LoanApplicationCreateNestedOneWithoutDecisionInput
  }

  export type LoanDecisionUncheckedCreateInput = {
    id?: string
    loanApplicationId: string
    officerId: string
    decision: string
    reason?: string | null
    overrideReason?: string | null
    decidedAt?: Date | string
  }

  export type LoanDecisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    officerId?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    overrideReason?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loanApplication?: LoanApplicationUpdateOneRequiredWithoutDecisionNestedInput
  }

  export type LoanDecisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    officerId?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    overrideReason?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanDecisionCreateManyInput = {
    id?: string
    loanApplicationId: string
    officerId: string
    decision: string
    reason?: string | null
    overrideReason?: string | null
    decidedAt?: Date | string
  }

  export type LoanDecisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    officerId?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    overrideReason?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanDecisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    officerId?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    overrideReason?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceReportCreateInput = {
    id?: string
    reportType: string
    riskScore: number
    reportedAt: Date | string
    status: string
    referenceNumber?: string | null
    createdAt?: Date | string
    loanApplication: LoanApplicationCreateNestedOneWithoutComplianceReportsInput
  }

  export type ComplianceReportUncheckedCreateInput = {
    id?: string
    loanApplicationId: string
    reportType: string
    riskScore: number
    reportedAt: Date | string
    status: string
    referenceNumber?: string | null
    createdAt?: Date | string
  }

  export type ComplianceReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loanApplication?: LoanApplicationUpdateOneRequiredWithoutComplianceReportsNestedInput
  }

  export type ComplianceReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceReportCreateManyInput = {
    id?: string
    loanApplicationId: string
    reportType: string
    riskScore: number
    reportedAt: Date | string
    status: string
    referenceNumber?: string | null
    createdAt?: Date | string
  }

  export type ComplianceReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanApplicationId?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumLoanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanType | EnumLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanTypeFilter<$PrismaModel> | $Enums.LoanType
  }

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type EnumAnalysisStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalysisStatus | EnumAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalysisStatusFilter<$PrismaModel> | $Enums.AnalysisStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentAnalysisListRelationFilter = {
    every?: DocumentAnalysisWhereInput
    some?: DocumentAnalysisWhereInput
    none?: DocumentAnalysisWhereInput
  }

  export type FraudFlagListRelationFilter = {
    every?: FraudFlagWhereInput
    some?: FraudFlagWhereInput
    none?: FraudFlagWhereInput
  }

  export type ComplianceReportListRelationFilter = {
    every?: ComplianceReportWhereInput
    some?: ComplianceReportWhereInput
    none?: ComplianceReportWhereInput
  }

  export type LoanDecisionNullableScalarRelationFilter = {
    is?: LoanDecisionWhereInput | null
    isNot?: LoanDecisionWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FraudFlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplianceReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    applicantName?: SortOrder
    applicantEmail?: SortOrder
    applicantPhone?: SortOrder
    loanAmountRequested?: SortOrder
    loanType?: SortOrder
    status?: SortOrder
    analysisStatus?: SortOrder
    analysisStartedAt?: SortOrder
    analysisCompletedAt?: SortOrder
    analysisError?: SortOrder
    documentsUploadedAt?: SortOrder
    currentRiskScore?: SortOrder
    recommendation?: SortOrder
    officerId?: SortOrder
    branchCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanApplicationAvgOrderByAggregateInput = {
    loanAmountRequested?: SortOrder
    currentRiskScore?: SortOrder
  }

  export type LoanApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    applicantName?: SortOrder
    applicantEmail?: SortOrder
    applicantPhone?: SortOrder
    loanAmountRequested?: SortOrder
    loanType?: SortOrder
    status?: SortOrder
    analysisStatus?: SortOrder
    analysisStartedAt?: SortOrder
    analysisCompletedAt?: SortOrder
    analysisError?: SortOrder
    documentsUploadedAt?: SortOrder
    currentRiskScore?: SortOrder
    recommendation?: SortOrder
    officerId?: SortOrder
    branchCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    applicantName?: SortOrder
    applicantEmail?: SortOrder
    applicantPhone?: SortOrder
    loanAmountRequested?: SortOrder
    loanType?: SortOrder
    status?: SortOrder
    analysisStatus?: SortOrder
    analysisStartedAt?: SortOrder
    analysisCompletedAt?: SortOrder
    analysisError?: SortOrder
    documentsUploadedAt?: SortOrder
    currentRiskScore?: SortOrder
    recommendation?: SortOrder
    officerId?: SortOrder
    branchCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanApplicationSumOrderByAggregateInput = {
    loanAmountRequested?: SortOrder
    currentRiskScore?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumLoanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanType | EnumLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanTypeWithAggregatesFilter<$PrismaModel> | $Enums.LoanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanTypeFilter<$PrismaModel>
    _max?: NestedEnumLoanTypeFilter<$PrismaModel>
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type EnumAnalysisStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalysisStatus | EnumAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalysisStatusWithAggregatesFilter<$PrismaModel> | $Enums.AnalysisStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnalysisStatusFilter<$PrismaModel>
    _max?: NestedEnumAnalysisStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LoanApplicationScalarRelationFilter = {
    is?: LoanApplicationWhereInput
    isNot?: LoanApplicationWhereInput
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    type?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    analysisStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    type?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    analysisStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    type?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    analysisStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DocumentAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    recommendation?: SortOrder
    riskLevel?: SortOrder
    processingTimeMs?: SortOrder
    documentsResult?: SortOrder
    crossChecks?: SortOrder
    riskFactors?: SortOrder
    analyzedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentAnalysisAvgOrderByAggregateInput = {
    riskScore?: SortOrder
    processingTimeMs?: SortOrder
  }

  export type DocumentAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    recommendation?: SortOrder
    riskLevel?: SortOrder
    processingTimeMs?: SortOrder
    analyzedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    recommendation?: SortOrder
    riskLevel?: SortOrder
    processingTimeMs?: SortOrder
    analyzedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentAnalysisSumOrderByAggregateInput = {
    riskScore?: SortOrder
    processingTimeMs?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FraudFlagCountOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    flaggedBy?: SortOrder
    reasons?: SortOrder
    resolved?: SortOrder
    resolvedBy?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FraudFlagAvgOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type FraudFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    flaggedBy?: SortOrder
    resolved?: SortOrder
    resolvedBy?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FraudFlagMinOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    riskScore?: SortOrder
    flaggedBy?: SortOrder
    resolved?: SortOrder
    resolvedBy?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FraudFlagSumOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type LoanDecisionCountOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    officerId?: SortOrder
    decision?: SortOrder
    reason?: SortOrder
    overrideReason?: SortOrder
    decidedAt?: SortOrder
  }

  export type LoanDecisionMaxOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    officerId?: SortOrder
    decision?: SortOrder
    reason?: SortOrder
    overrideReason?: SortOrder
    decidedAt?: SortOrder
  }

  export type LoanDecisionMinOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    officerId?: SortOrder
    decision?: SortOrder
    reason?: SortOrder
    overrideReason?: SortOrder
    decidedAt?: SortOrder
  }

  export type ComplianceReportCountOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    reportType?: SortOrder
    riskScore?: SortOrder
    reportedAt?: SortOrder
    status?: SortOrder
    referenceNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplianceReportAvgOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type ComplianceReportMaxOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    reportType?: SortOrder
    riskScore?: SortOrder
    reportedAt?: SortOrder
    status?: SortOrder
    referenceNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplianceReportMinOrderByAggregateInput = {
    id?: SortOrder
    loanApplicationId?: SortOrder
    reportType?: SortOrder
    riskScore?: SortOrder
    reportedAt?: SortOrder
    status?: SortOrder
    referenceNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplianceReportSumOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type DocumentCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<DocumentCreateWithoutLoanApplicationInput, DocumentUncheckedCreateWithoutLoanApplicationInput> | DocumentCreateWithoutLoanApplicationInput[] | DocumentUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLoanApplicationInput | DocumentCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: DocumentCreateManyLoanApplicationInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentAnalysisCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<DocumentAnalysisCreateWithoutLoanApplicationInput, DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput> | DocumentAnalysisCreateWithoutLoanApplicationInput[] | DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput | DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: DocumentAnalysisCreateManyLoanApplicationInputEnvelope
    connect?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
  }

  export type FraudFlagCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<FraudFlagCreateWithoutLoanApplicationInput, FraudFlagUncheckedCreateWithoutLoanApplicationInput> | FraudFlagCreateWithoutLoanApplicationInput[] | FraudFlagUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: FraudFlagCreateOrConnectWithoutLoanApplicationInput | FraudFlagCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: FraudFlagCreateManyLoanApplicationInputEnvelope
    connect?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
  }

  export type ComplianceReportCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<ComplianceReportCreateWithoutLoanApplicationInput, ComplianceReportUncheckedCreateWithoutLoanApplicationInput> | ComplianceReportCreateWithoutLoanApplicationInput[] | ComplianceReportUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: ComplianceReportCreateOrConnectWithoutLoanApplicationInput | ComplianceReportCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: ComplianceReportCreateManyLoanApplicationInputEnvelope
    connect?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
  }

  export type LoanDecisionCreateNestedOneWithoutLoanApplicationInput = {
    create?: XOR<LoanDecisionCreateWithoutLoanApplicationInput, LoanDecisionUncheckedCreateWithoutLoanApplicationInput>
    connectOrCreate?: LoanDecisionCreateOrConnectWithoutLoanApplicationInput
    connect?: LoanDecisionWhereUniqueInput
  }

  export type DocumentUncheckedCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<DocumentCreateWithoutLoanApplicationInput, DocumentUncheckedCreateWithoutLoanApplicationInput> | DocumentCreateWithoutLoanApplicationInput[] | DocumentUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLoanApplicationInput | DocumentCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: DocumentCreateManyLoanApplicationInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentAnalysisUncheckedCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<DocumentAnalysisCreateWithoutLoanApplicationInput, DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput> | DocumentAnalysisCreateWithoutLoanApplicationInput[] | DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput | DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: DocumentAnalysisCreateManyLoanApplicationInputEnvelope
    connect?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
  }

  export type FraudFlagUncheckedCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<FraudFlagCreateWithoutLoanApplicationInput, FraudFlagUncheckedCreateWithoutLoanApplicationInput> | FraudFlagCreateWithoutLoanApplicationInput[] | FraudFlagUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: FraudFlagCreateOrConnectWithoutLoanApplicationInput | FraudFlagCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: FraudFlagCreateManyLoanApplicationInputEnvelope
    connect?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
  }

  export type ComplianceReportUncheckedCreateNestedManyWithoutLoanApplicationInput = {
    create?: XOR<ComplianceReportCreateWithoutLoanApplicationInput, ComplianceReportUncheckedCreateWithoutLoanApplicationInput> | ComplianceReportCreateWithoutLoanApplicationInput[] | ComplianceReportUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: ComplianceReportCreateOrConnectWithoutLoanApplicationInput | ComplianceReportCreateOrConnectWithoutLoanApplicationInput[]
    createMany?: ComplianceReportCreateManyLoanApplicationInputEnvelope
    connect?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
  }

  export type LoanDecisionUncheckedCreateNestedOneWithoutLoanApplicationInput = {
    create?: XOR<LoanDecisionCreateWithoutLoanApplicationInput, LoanDecisionUncheckedCreateWithoutLoanApplicationInput>
    connectOrCreate?: LoanDecisionCreateOrConnectWithoutLoanApplicationInput
    connect?: LoanDecisionWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumLoanTypeFieldUpdateOperationsInput = {
    set?: $Enums.LoanType
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type EnumAnalysisStatusFieldUpdateOperationsInput = {
    set?: $Enums.AnalysisStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DocumentUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<DocumentCreateWithoutLoanApplicationInput, DocumentUncheckedCreateWithoutLoanApplicationInput> | DocumentCreateWithoutLoanApplicationInput[] | DocumentUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLoanApplicationInput | DocumentCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutLoanApplicationInput | DocumentUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: DocumentCreateManyLoanApplicationInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutLoanApplicationInput | DocumentUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutLoanApplicationInput | DocumentUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentAnalysisUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<DocumentAnalysisCreateWithoutLoanApplicationInput, DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput> | DocumentAnalysisCreateWithoutLoanApplicationInput[] | DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput | DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: DocumentAnalysisUpsertWithWhereUniqueWithoutLoanApplicationInput | DocumentAnalysisUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: DocumentAnalysisCreateManyLoanApplicationInputEnvelope
    set?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    disconnect?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    delete?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    connect?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    update?: DocumentAnalysisUpdateWithWhereUniqueWithoutLoanApplicationInput | DocumentAnalysisUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: DocumentAnalysisUpdateManyWithWhereWithoutLoanApplicationInput | DocumentAnalysisUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: DocumentAnalysisScalarWhereInput | DocumentAnalysisScalarWhereInput[]
  }

  export type FraudFlagUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<FraudFlagCreateWithoutLoanApplicationInput, FraudFlagUncheckedCreateWithoutLoanApplicationInput> | FraudFlagCreateWithoutLoanApplicationInput[] | FraudFlagUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: FraudFlagCreateOrConnectWithoutLoanApplicationInput | FraudFlagCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: FraudFlagUpsertWithWhereUniqueWithoutLoanApplicationInput | FraudFlagUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: FraudFlagCreateManyLoanApplicationInputEnvelope
    set?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    disconnect?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    delete?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    connect?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    update?: FraudFlagUpdateWithWhereUniqueWithoutLoanApplicationInput | FraudFlagUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: FraudFlagUpdateManyWithWhereWithoutLoanApplicationInput | FraudFlagUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: FraudFlagScalarWhereInput | FraudFlagScalarWhereInput[]
  }

  export type ComplianceReportUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<ComplianceReportCreateWithoutLoanApplicationInput, ComplianceReportUncheckedCreateWithoutLoanApplicationInput> | ComplianceReportCreateWithoutLoanApplicationInput[] | ComplianceReportUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: ComplianceReportCreateOrConnectWithoutLoanApplicationInput | ComplianceReportCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: ComplianceReportUpsertWithWhereUniqueWithoutLoanApplicationInput | ComplianceReportUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: ComplianceReportCreateManyLoanApplicationInputEnvelope
    set?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    disconnect?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    delete?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    connect?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    update?: ComplianceReportUpdateWithWhereUniqueWithoutLoanApplicationInput | ComplianceReportUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: ComplianceReportUpdateManyWithWhereWithoutLoanApplicationInput | ComplianceReportUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: ComplianceReportScalarWhereInput | ComplianceReportScalarWhereInput[]
  }

  export type LoanDecisionUpdateOneWithoutLoanApplicationNestedInput = {
    create?: XOR<LoanDecisionCreateWithoutLoanApplicationInput, LoanDecisionUncheckedCreateWithoutLoanApplicationInput>
    connectOrCreate?: LoanDecisionCreateOrConnectWithoutLoanApplicationInput
    upsert?: LoanDecisionUpsertWithoutLoanApplicationInput
    disconnect?: LoanDecisionWhereInput | boolean
    delete?: LoanDecisionWhereInput | boolean
    connect?: LoanDecisionWhereUniqueInput
    update?: XOR<XOR<LoanDecisionUpdateToOneWithWhereWithoutLoanApplicationInput, LoanDecisionUpdateWithoutLoanApplicationInput>, LoanDecisionUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type DocumentUncheckedUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<DocumentCreateWithoutLoanApplicationInput, DocumentUncheckedCreateWithoutLoanApplicationInput> | DocumentCreateWithoutLoanApplicationInput[] | DocumentUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLoanApplicationInput | DocumentCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutLoanApplicationInput | DocumentUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: DocumentCreateManyLoanApplicationInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutLoanApplicationInput | DocumentUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutLoanApplicationInput | DocumentUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<DocumentAnalysisCreateWithoutLoanApplicationInput, DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput> | DocumentAnalysisCreateWithoutLoanApplicationInput[] | DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput | DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: DocumentAnalysisUpsertWithWhereUniqueWithoutLoanApplicationInput | DocumentAnalysisUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: DocumentAnalysisCreateManyLoanApplicationInputEnvelope
    set?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    disconnect?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    delete?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    connect?: DocumentAnalysisWhereUniqueInput | DocumentAnalysisWhereUniqueInput[]
    update?: DocumentAnalysisUpdateWithWhereUniqueWithoutLoanApplicationInput | DocumentAnalysisUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: DocumentAnalysisUpdateManyWithWhereWithoutLoanApplicationInput | DocumentAnalysisUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: DocumentAnalysisScalarWhereInput | DocumentAnalysisScalarWhereInput[]
  }

  export type FraudFlagUncheckedUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<FraudFlagCreateWithoutLoanApplicationInput, FraudFlagUncheckedCreateWithoutLoanApplicationInput> | FraudFlagCreateWithoutLoanApplicationInput[] | FraudFlagUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: FraudFlagCreateOrConnectWithoutLoanApplicationInput | FraudFlagCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: FraudFlagUpsertWithWhereUniqueWithoutLoanApplicationInput | FraudFlagUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: FraudFlagCreateManyLoanApplicationInputEnvelope
    set?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    disconnect?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    delete?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    connect?: FraudFlagWhereUniqueInput | FraudFlagWhereUniqueInput[]
    update?: FraudFlagUpdateWithWhereUniqueWithoutLoanApplicationInput | FraudFlagUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: FraudFlagUpdateManyWithWhereWithoutLoanApplicationInput | FraudFlagUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: FraudFlagScalarWhereInput | FraudFlagScalarWhereInput[]
  }

  export type ComplianceReportUncheckedUpdateManyWithoutLoanApplicationNestedInput = {
    create?: XOR<ComplianceReportCreateWithoutLoanApplicationInput, ComplianceReportUncheckedCreateWithoutLoanApplicationInput> | ComplianceReportCreateWithoutLoanApplicationInput[] | ComplianceReportUncheckedCreateWithoutLoanApplicationInput[]
    connectOrCreate?: ComplianceReportCreateOrConnectWithoutLoanApplicationInput | ComplianceReportCreateOrConnectWithoutLoanApplicationInput[]
    upsert?: ComplianceReportUpsertWithWhereUniqueWithoutLoanApplicationInput | ComplianceReportUpsertWithWhereUniqueWithoutLoanApplicationInput[]
    createMany?: ComplianceReportCreateManyLoanApplicationInputEnvelope
    set?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    disconnect?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    delete?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    connect?: ComplianceReportWhereUniqueInput | ComplianceReportWhereUniqueInput[]
    update?: ComplianceReportUpdateWithWhereUniqueWithoutLoanApplicationInput | ComplianceReportUpdateWithWhereUniqueWithoutLoanApplicationInput[]
    updateMany?: ComplianceReportUpdateManyWithWhereWithoutLoanApplicationInput | ComplianceReportUpdateManyWithWhereWithoutLoanApplicationInput[]
    deleteMany?: ComplianceReportScalarWhereInput | ComplianceReportScalarWhereInput[]
  }

  export type LoanDecisionUncheckedUpdateOneWithoutLoanApplicationNestedInput = {
    create?: XOR<LoanDecisionCreateWithoutLoanApplicationInput, LoanDecisionUncheckedCreateWithoutLoanApplicationInput>
    connectOrCreate?: LoanDecisionCreateOrConnectWithoutLoanApplicationInput
    upsert?: LoanDecisionUpsertWithoutLoanApplicationInput
    disconnect?: LoanDecisionWhereInput | boolean
    delete?: LoanDecisionWhereInput | boolean
    connect?: LoanDecisionWhereUniqueInput
    update?: XOR<XOR<LoanDecisionUpdateToOneWithWhereWithoutLoanApplicationInput, LoanDecisionUpdateWithoutLoanApplicationInput>, LoanDecisionUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type LoanApplicationCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<LoanApplicationCreateWithoutDocumentsInput, LoanApplicationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutDocumentsInput
    connect?: LoanApplicationWhereUniqueInput
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LoanApplicationUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<LoanApplicationCreateWithoutDocumentsInput, LoanApplicationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutDocumentsInput
    upsert?: LoanApplicationUpsertWithoutDocumentsInput
    connect?: LoanApplicationWhereUniqueInput
    update?: XOR<XOR<LoanApplicationUpdateToOneWithWhereWithoutDocumentsInput, LoanApplicationUpdateWithoutDocumentsInput>, LoanApplicationUncheckedUpdateWithoutDocumentsInput>
  }

  export type LoanApplicationCreateNestedOneWithoutAnalysisInput = {
    create?: XOR<LoanApplicationCreateWithoutAnalysisInput, LoanApplicationUncheckedCreateWithoutAnalysisInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutAnalysisInput
    connect?: LoanApplicationWhereUniqueInput
  }

  export type LoanApplicationUpdateOneRequiredWithoutAnalysisNestedInput = {
    create?: XOR<LoanApplicationCreateWithoutAnalysisInput, LoanApplicationUncheckedCreateWithoutAnalysisInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutAnalysisInput
    upsert?: LoanApplicationUpsertWithoutAnalysisInput
    connect?: LoanApplicationWhereUniqueInput
    update?: XOR<XOR<LoanApplicationUpdateToOneWithWhereWithoutAnalysisInput, LoanApplicationUpdateWithoutAnalysisInput>, LoanApplicationUncheckedUpdateWithoutAnalysisInput>
  }

  export type FraudFlagCreatereasonsInput = {
    set: string[]
  }

  export type LoanApplicationCreateNestedOneWithoutFraudFlagsInput = {
    create?: XOR<LoanApplicationCreateWithoutFraudFlagsInput, LoanApplicationUncheckedCreateWithoutFraudFlagsInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutFraudFlagsInput
    connect?: LoanApplicationWhereUniqueInput
  }

  export type FraudFlagUpdatereasonsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LoanApplicationUpdateOneRequiredWithoutFraudFlagsNestedInput = {
    create?: XOR<LoanApplicationCreateWithoutFraudFlagsInput, LoanApplicationUncheckedCreateWithoutFraudFlagsInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutFraudFlagsInput
    upsert?: LoanApplicationUpsertWithoutFraudFlagsInput
    connect?: LoanApplicationWhereUniqueInput
    update?: XOR<XOR<LoanApplicationUpdateToOneWithWhereWithoutFraudFlagsInput, LoanApplicationUpdateWithoutFraudFlagsInput>, LoanApplicationUncheckedUpdateWithoutFraudFlagsInput>
  }

  export type LoanApplicationCreateNestedOneWithoutDecisionInput = {
    create?: XOR<LoanApplicationCreateWithoutDecisionInput, LoanApplicationUncheckedCreateWithoutDecisionInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutDecisionInput
    connect?: LoanApplicationWhereUniqueInput
  }

  export type LoanApplicationUpdateOneRequiredWithoutDecisionNestedInput = {
    create?: XOR<LoanApplicationCreateWithoutDecisionInput, LoanApplicationUncheckedCreateWithoutDecisionInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutDecisionInput
    upsert?: LoanApplicationUpsertWithoutDecisionInput
    connect?: LoanApplicationWhereUniqueInput
    update?: XOR<XOR<LoanApplicationUpdateToOneWithWhereWithoutDecisionInput, LoanApplicationUpdateWithoutDecisionInput>, LoanApplicationUncheckedUpdateWithoutDecisionInput>
  }

  export type LoanApplicationCreateNestedOneWithoutComplianceReportsInput = {
    create?: XOR<LoanApplicationCreateWithoutComplianceReportsInput, LoanApplicationUncheckedCreateWithoutComplianceReportsInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutComplianceReportsInput
    connect?: LoanApplicationWhereUniqueInput
  }

  export type LoanApplicationUpdateOneRequiredWithoutComplianceReportsNestedInput = {
    create?: XOR<LoanApplicationCreateWithoutComplianceReportsInput, LoanApplicationUncheckedCreateWithoutComplianceReportsInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutComplianceReportsInput
    upsert?: LoanApplicationUpsertWithoutComplianceReportsInput
    connect?: LoanApplicationWhereUniqueInput
    update?: XOR<XOR<LoanApplicationUpdateToOneWithWhereWithoutComplianceReportsInput, LoanApplicationUpdateWithoutComplianceReportsInput>, LoanApplicationUncheckedUpdateWithoutComplianceReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumLoanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanType | EnumLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanTypeFilter<$PrismaModel> | $Enums.LoanType
  }

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedEnumAnalysisStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalysisStatus | EnumAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalysisStatusFilter<$PrismaModel> | $Enums.AnalysisStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumLoanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanType | EnumLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanType[] | ListEnumLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanTypeWithAggregatesFilter<$PrismaModel> | $Enums.LoanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanTypeFilter<$PrismaModel>
    _max?: NestedEnumLoanTypeFilter<$PrismaModel>
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type NestedEnumAnalysisStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalysisStatus | EnumAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalysisStatus[] | ListEnumAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalysisStatusWithAggregatesFilter<$PrismaModel> | $Enums.AnalysisStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnalysisStatusFilter<$PrismaModel>
    _max?: NestedEnumAnalysisStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutLoanApplicationInput = {
    id?: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus?: string
    createdAt?: Date | string
  }

  export type DocumentUncheckedCreateWithoutLoanApplicationInput = {
    id?: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus?: string
    createdAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutLoanApplicationInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutLoanApplicationInput, DocumentUncheckedCreateWithoutLoanApplicationInput>
  }

  export type DocumentCreateManyLoanApplicationInputEnvelope = {
    data: DocumentCreateManyLoanApplicationInput | DocumentCreateManyLoanApplicationInput[]
    skipDuplicates?: boolean
  }

  export type DocumentAnalysisCreateWithoutLoanApplicationInput = {
    id?: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonNullValueInput | InputJsonValue
    crossChecks: JsonNullValueInput | InputJsonValue
    riskFactors: JsonNullValueInput | InputJsonValue
    analyzedAt: Date | string
    createdAt?: Date | string
  }

  export type DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput = {
    id?: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonNullValueInput | InputJsonValue
    crossChecks: JsonNullValueInput | InputJsonValue
    riskFactors: JsonNullValueInput | InputJsonValue
    analyzedAt: Date | string
    createdAt?: Date | string
  }

  export type DocumentAnalysisCreateOrConnectWithoutLoanApplicationInput = {
    where: DocumentAnalysisWhereUniqueInput
    create: XOR<DocumentAnalysisCreateWithoutLoanApplicationInput, DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput>
  }

  export type DocumentAnalysisCreateManyLoanApplicationInputEnvelope = {
    data: DocumentAnalysisCreateManyLoanApplicationInput | DocumentAnalysisCreateManyLoanApplicationInput[]
    skipDuplicates?: boolean
  }

  export type FraudFlagCreateWithoutLoanApplicationInput = {
    id?: string
    riskScore: number
    flaggedBy: string
    reasons?: FraudFlagCreatereasonsInput | string[]
    resolved?: boolean
    resolvedBy?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FraudFlagUncheckedCreateWithoutLoanApplicationInput = {
    id?: string
    riskScore: number
    flaggedBy: string
    reasons?: FraudFlagCreatereasonsInput | string[]
    resolved?: boolean
    resolvedBy?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FraudFlagCreateOrConnectWithoutLoanApplicationInput = {
    where: FraudFlagWhereUniqueInput
    create: XOR<FraudFlagCreateWithoutLoanApplicationInput, FraudFlagUncheckedCreateWithoutLoanApplicationInput>
  }

  export type FraudFlagCreateManyLoanApplicationInputEnvelope = {
    data: FraudFlagCreateManyLoanApplicationInput | FraudFlagCreateManyLoanApplicationInput[]
    skipDuplicates?: boolean
  }

  export type ComplianceReportCreateWithoutLoanApplicationInput = {
    id?: string
    reportType: string
    riskScore: number
    reportedAt: Date | string
    status: string
    referenceNumber?: string | null
    createdAt?: Date | string
  }

  export type ComplianceReportUncheckedCreateWithoutLoanApplicationInput = {
    id?: string
    reportType: string
    riskScore: number
    reportedAt: Date | string
    status: string
    referenceNumber?: string | null
    createdAt?: Date | string
  }

  export type ComplianceReportCreateOrConnectWithoutLoanApplicationInput = {
    where: ComplianceReportWhereUniqueInput
    create: XOR<ComplianceReportCreateWithoutLoanApplicationInput, ComplianceReportUncheckedCreateWithoutLoanApplicationInput>
  }

  export type ComplianceReportCreateManyLoanApplicationInputEnvelope = {
    data: ComplianceReportCreateManyLoanApplicationInput | ComplianceReportCreateManyLoanApplicationInput[]
    skipDuplicates?: boolean
  }

  export type LoanDecisionCreateWithoutLoanApplicationInput = {
    id?: string
    officerId: string
    decision: string
    reason?: string | null
    overrideReason?: string | null
    decidedAt?: Date | string
  }

  export type LoanDecisionUncheckedCreateWithoutLoanApplicationInput = {
    id?: string
    officerId: string
    decision: string
    reason?: string | null
    overrideReason?: string | null
    decidedAt?: Date | string
  }

  export type LoanDecisionCreateOrConnectWithoutLoanApplicationInput = {
    where: LoanDecisionWhereUniqueInput
    create: XOR<LoanDecisionCreateWithoutLoanApplicationInput, LoanDecisionUncheckedCreateWithoutLoanApplicationInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutLoanApplicationInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutLoanApplicationInput, DocumentUncheckedUpdateWithoutLoanApplicationInput>
    create: XOR<DocumentCreateWithoutLoanApplicationInput, DocumentUncheckedCreateWithoutLoanApplicationInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutLoanApplicationInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutLoanApplicationInput, DocumentUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type DocumentUpdateManyWithWhereWithoutLoanApplicationInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutLoanApplicationInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    loanApplicationId?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    s3Key?: StringFilter<"Document"> | string
    s3Url?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    sizeBytes?: IntFilter<"Document"> | number
    uploadedBy?: StringFilter<"Document"> | string
    analysisStatus?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type DocumentAnalysisUpsertWithWhereUniqueWithoutLoanApplicationInput = {
    where: DocumentAnalysisWhereUniqueInput
    update: XOR<DocumentAnalysisUpdateWithoutLoanApplicationInput, DocumentAnalysisUncheckedUpdateWithoutLoanApplicationInput>
    create: XOR<DocumentAnalysisCreateWithoutLoanApplicationInput, DocumentAnalysisUncheckedCreateWithoutLoanApplicationInput>
  }

  export type DocumentAnalysisUpdateWithWhereUniqueWithoutLoanApplicationInput = {
    where: DocumentAnalysisWhereUniqueInput
    data: XOR<DocumentAnalysisUpdateWithoutLoanApplicationInput, DocumentAnalysisUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type DocumentAnalysisUpdateManyWithWhereWithoutLoanApplicationInput = {
    where: DocumentAnalysisScalarWhereInput
    data: XOR<DocumentAnalysisUpdateManyMutationInput, DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationInput>
  }

  export type DocumentAnalysisScalarWhereInput = {
    AND?: DocumentAnalysisScalarWhereInput | DocumentAnalysisScalarWhereInput[]
    OR?: DocumentAnalysisScalarWhereInput[]
    NOT?: DocumentAnalysisScalarWhereInput | DocumentAnalysisScalarWhereInput[]
    id?: StringFilter<"DocumentAnalysis"> | string
    loanApplicationId?: StringFilter<"DocumentAnalysis"> | string
    riskScore?: IntFilter<"DocumentAnalysis"> | number
    recommendation?: StringFilter<"DocumentAnalysis"> | string
    riskLevel?: StringFilter<"DocumentAnalysis"> | string
    processingTimeMs?: IntFilter<"DocumentAnalysis"> | number
    documentsResult?: JsonFilter<"DocumentAnalysis">
    crossChecks?: JsonFilter<"DocumentAnalysis">
    riskFactors?: JsonFilter<"DocumentAnalysis">
    analyzedAt?: DateTimeFilter<"DocumentAnalysis"> | Date | string
    createdAt?: DateTimeFilter<"DocumentAnalysis"> | Date | string
  }

  export type FraudFlagUpsertWithWhereUniqueWithoutLoanApplicationInput = {
    where: FraudFlagWhereUniqueInput
    update: XOR<FraudFlagUpdateWithoutLoanApplicationInput, FraudFlagUncheckedUpdateWithoutLoanApplicationInput>
    create: XOR<FraudFlagCreateWithoutLoanApplicationInput, FraudFlagUncheckedCreateWithoutLoanApplicationInput>
  }

  export type FraudFlagUpdateWithWhereUniqueWithoutLoanApplicationInput = {
    where: FraudFlagWhereUniqueInput
    data: XOR<FraudFlagUpdateWithoutLoanApplicationInput, FraudFlagUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type FraudFlagUpdateManyWithWhereWithoutLoanApplicationInput = {
    where: FraudFlagScalarWhereInput
    data: XOR<FraudFlagUpdateManyMutationInput, FraudFlagUncheckedUpdateManyWithoutLoanApplicationInput>
  }

  export type FraudFlagScalarWhereInput = {
    AND?: FraudFlagScalarWhereInput | FraudFlagScalarWhereInput[]
    OR?: FraudFlagScalarWhereInput[]
    NOT?: FraudFlagScalarWhereInput | FraudFlagScalarWhereInput[]
    id?: StringFilter<"FraudFlag"> | string
    loanApplicationId?: StringFilter<"FraudFlag"> | string
    riskScore?: IntFilter<"FraudFlag"> | number
    flaggedBy?: StringFilter<"FraudFlag"> | string
    reasons?: StringNullableListFilter<"FraudFlag">
    resolved?: BoolFilter<"FraudFlag"> | boolean
    resolvedBy?: StringNullableFilter<"FraudFlag"> | string | null
    resolvedAt?: DateTimeNullableFilter<"FraudFlag"> | Date | string | null
    createdAt?: DateTimeFilter<"FraudFlag"> | Date | string
  }

  export type ComplianceReportUpsertWithWhereUniqueWithoutLoanApplicationInput = {
    where: ComplianceReportWhereUniqueInput
    update: XOR<ComplianceReportUpdateWithoutLoanApplicationInput, ComplianceReportUncheckedUpdateWithoutLoanApplicationInput>
    create: XOR<ComplianceReportCreateWithoutLoanApplicationInput, ComplianceReportUncheckedCreateWithoutLoanApplicationInput>
  }

  export type ComplianceReportUpdateWithWhereUniqueWithoutLoanApplicationInput = {
    where: ComplianceReportWhereUniqueInput
    data: XOR<ComplianceReportUpdateWithoutLoanApplicationInput, ComplianceReportUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type ComplianceReportUpdateManyWithWhereWithoutLoanApplicationInput = {
    where: ComplianceReportScalarWhereInput
    data: XOR<ComplianceReportUpdateManyMutationInput, ComplianceReportUncheckedUpdateManyWithoutLoanApplicationInput>
  }

  export type ComplianceReportScalarWhereInput = {
    AND?: ComplianceReportScalarWhereInput | ComplianceReportScalarWhereInput[]
    OR?: ComplianceReportScalarWhereInput[]
    NOT?: ComplianceReportScalarWhereInput | ComplianceReportScalarWhereInput[]
    id?: StringFilter<"ComplianceReport"> | string
    loanApplicationId?: StringFilter<"ComplianceReport"> | string
    reportType?: StringFilter<"ComplianceReport"> | string
    riskScore?: IntFilter<"ComplianceReport"> | number
    reportedAt?: DateTimeFilter<"ComplianceReport"> | Date | string
    status?: StringFilter<"ComplianceReport"> | string
    referenceNumber?: StringNullableFilter<"ComplianceReport"> | string | null
    createdAt?: DateTimeFilter<"ComplianceReport"> | Date | string
  }

  export type LoanDecisionUpsertWithoutLoanApplicationInput = {
    update: XOR<LoanDecisionUpdateWithoutLoanApplicationInput, LoanDecisionUncheckedUpdateWithoutLoanApplicationInput>
    create: XOR<LoanDecisionCreateWithoutLoanApplicationInput, LoanDecisionUncheckedCreateWithoutLoanApplicationInput>
    where?: LoanDecisionWhereInput
  }

  export type LoanDecisionUpdateToOneWithWhereWithoutLoanApplicationInput = {
    where?: LoanDecisionWhereInput
    data: XOR<LoanDecisionUpdateWithoutLoanApplicationInput, LoanDecisionUncheckedUpdateWithoutLoanApplicationInput>
  }

  export type LoanDecisionUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    officerId?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    overrideReason?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanDecisionUncheckedUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    officerId?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    overrideReason?: NullableStringFieldUpdateOperationsInput | string | null
    decidedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanApplicationCreateWithoutDocumentsInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    analysis?: DocumentAnalysisCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationUncheckedCreateWithoutDocumentsInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    analysis?: DocumentAnalysisUncheckedCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagUncheckedCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportUncheckedCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionUncheckedCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationCreateOrConnectWithoutDocumentsInput = {
    where: LoanApplicationWhereUniqueInput
    create: XOR<LoanApplicationCreateWithoutDocumentsInput, LoanApplicationUncheckedCreateWithoutDocumentsInput>
  }

  export type LoanApplicationUpsertWithoutDocumentsInput = {
    update: XOR<LoanApplicationUpdateWithoutDocumentsInput, LoanApplicationUncheckedUpdateWithoutDocumentsInput>
    create: XOR<LoanApplicationCreateWithoutDocumentsInput, LoanApplicationUncheckedCreateWithoutDocumentsInput>
    where?: LoanApplicationWhereInput
  }

  export type LoanApplicationUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: LoanApplicationWhereInput
    data: XOR<LoanApplicationUpdateWithoutDocumentsInput, LoanApplicationUncheckedUpdateWithoutDocumentsInput>
  }

  export type LoanApplicationUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysis?: DocumentAnalysisUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysis?: DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUncheckedUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUncheckedUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUncheckedUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationCreateWithoutAnalysisInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationUncheckedCreateWithoutAnalysisInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagUncheckedCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportUncheckedCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionUncheckedCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationCreateOrConnectWithoutAnalysisInput = {
    where: LoanApplicationWhereUniqueInput
    create: XOR<LoanApplicationCreateWithoutAnalysisInput, LoanApplicationUncheckedCreateWithoutAnalysisInput>
  }

  export type LoanApplicationUpsertWithoutAnalysisInput = {
    update: XOR<LoanApplicationUpdateWithoutAnalysisInput, LoanApplicationUncheckedUpdateWithoutAnalysisInput>
    create: XOR<LoanApplicationCreateWithoutAnalysisInput, LoanApplicationUncheckedCreateWithoutAnalysisInput>
    where?: LoanApplicationWhereInput
  }

  export type LoanApplicationUpdateToOneWithWhereWithoutAnalysisInput = {
    where?: LoanApplicationWhereInput
    data: XOR<LoanApplicationUpdateWithoutAnalysisInput, LoanApplicationUncheckedUpdateWithoutAnalysisInput>
  }

  export type LoanApplicationUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUncheckedUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUncheckedUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUncheckedUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationCreateWithoutFraudFlagsInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationUncheckedCreateWithoutFraudFlagsInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisUncheckedCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportUncheckedCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionUncheckedCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationCreateOrConnectWithoutFraudFlagsInput = {
    where: LoanApplicationWhereUniqueInput
    create: XOR<LoanApplicationCreateWithoutFraudFlagsInput, LoanApplicationUncheckedCreateWithoutFraudFlagsInput>
  }

  export type LoanApplicationUpsertWithoutFraudFlagsInput = {
    update: XOR<LoanApplicationUpdateWithoutFraudFlagsInput, LoanApplicationUncheckedUpdateWithoutFraudFlagsInput>
    create: XOR<LoanApplicationCreateWithoutFraudFlagsInput, LoanApplicationUncheckedCreateWithoutFraudFlagsInput>
    where?: LoanApplicationWhereInput
  }

  export type LoanApplicationUpdateToOneWithWhereWithoutFraudFlagsInput = {
    where?: LoanApplicationWhereInput
    data: XOR<LoanApplicationUpdateWithoutFraudFlagsInput, LoanApplicationUncheckedUpdateWithoutFraudFlagsInput>
  }

  export type LoanApplicationUpdateWithoutFraudFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationUncheckedUpdateWithoutFraudFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUncheckedUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUncheckedUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationCreateWithoutDecisionInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportCreateNestedManyWithoutLoanApplicationInput
  }

  export type LoanApplicationUncheckedCreateWithoutDecisionInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisUncheckedCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagUncheckedCreateNestedManyWithoutLoanApplicationInput
    complianceReports?: ComplianceReportUncheckedCreateNestedManyWithoutLoanApplicationInput
  }

  export type LoanApplicationCreateOrConnectWithoutDecisionInput = {
    where: LoanApplicationWhereUniqueInput
    create: XOR<LoanApplicationCreateWithoutDecisionInput, LoanApplicationUncheckedCreateWithoutDecisionInput>
  }

  export type LoanApplicationUpsertWithoutDecisionInput = {
    update: XOR<LoanApplicationUpdateWithoutDecisionInput, LoanApplicationUncheckedUpdateWithoutDecisionInput>
    create: XOR<LoanApplicationCreateWithoutDecisionInput, LoanApplicationUncheckedCreateWithoutDecisionInput>
    where?: LoanApplicationWhereInput
  }

  export type LoanApplicationUpdateToOneWithWhereWithoutDecisionInput = {
    where?: LoanApplicationWhereInput
    data: XOR<LoanApplicationUpdateWithoutDecisionInput, LoanApplicationUncheckedUpdateWithoutDecisionInput>
  }

  export type LoanApplicationUpdateWithoutDecisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUpdateManyWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationUncheckedUpdateWithoutDecisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUncheckedUpdateManyWithoutLoanApplicationNestedInput
    complianceReports?: ComplianceReportUncheckedUpdateManyWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationCreateWithoutComplianceReportsInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationUncheckedCreateWithoutComplianceReportsInput = {
    id?: string
    applicationNumber?: string
    applicantName: string
    applicantEmail?: string | null
    applicantPhone: string
    loanAmountRequested: number
    loanType?: $Enums.LoanType
    status?: $Enums.LoanStatus
    analysisStatus?: $Enums.AnalysisStatus
    analysisStartedAt?: Date | string | null
    analysisCompletedAt?: Date | string | null
    analysisError?: string | null
    documentsUploadedAt?: Date | string | null
    currentRiskScore?: number | null
    recommendation?: string | null
    officerId?: string | null
    branchCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutLoanApplicationInput
    analysis?: DocumentAnalysisUncheckedCreateNestedManyWithoutLoanApplicationInput
    fraudFlags?: FraudFlagUncheckedCreateNestedManyWithoutLoanApplicationInput
    decision?: LoanDecisionUncheckedCreateNestedOneWithoutLoanApplicationInput
  }

  export type LoanApplicationCreateOrConnectWithoutComplianceReportsInput = {
    where: LoanApplicationWhereUniqueInput
    create: XOR<LoanApplicationCreateWithoutComplianceReportsInput, LoanApplicationUncheckedCreateWithoutComplianceReportsInput>
  }

  export type LoanApplicationUpsertWithoutComplianceReportsInput = {
    update: XOR<LoanApplicationUpdateWithoutComplianceReportsInput, LoanApplicationUncheckedUpdateWithoutComplianceReportsInput>
    create: XOR<LoanApplicationCreateWithoutComplianceReportsInput, LoanApplicationUncheckedCreateWithoutComplianceReportsInput>
    where?: LoanApplicationWhereInput
  }

  export type LoanApplicationUpdateToOneWithWhereWithoutComplianceReportsInput = {
    where?: LoanApplicationWhereInput
    data: XOR<LoanApplicationUpdateWithoutComplianceReportsInput, LoanApplicationUncheckedUpdateWithoutComplianceReportsInput>
  }

  export type LoanApplicationUpdateWithoutComplianceReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUpdateOneWithoutLoanApplicationNestedInput
  }

  export type LoanApplicationUncheckedUpdateWithoutComplianceReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantEmail?: NullableStringFieldUpdateOperationsInput | string | null
    applicantPhone?: StringFieldUpdateOperationsInput | string
    loanAmountRequested?: FloatFieldUpdateOperationsInput | number
    loanType?: EnumLoanTypeFieldUpdateOperationsInput | $Enums.LoanType
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    analysisStatus?: EnumAnalysisStatusFieldUpdateOperationsInput | $Enums.AnalysisStatus
    analysisStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysisError?: NullableStringFieldUpdateOperationsInput | string | null
    documentsUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentRiskScore?: NullableIntFieldUpdateOperationsInput | number | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    officerId?: NullableStringFieldUpdateOperationsInput | string | null
    branchCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutLoanApplicationNestedInput
    analysis?: DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationNestedInput
    fraudFlags?: FraudFlagUncheckedUpdateManyWithoutLoanApplicationNestedInput
    decision?: LoanDecisionUncheckedUpdateOneWithoutLoanApplicationNestedInput
  }

  export type DocumentCreateManyLoanApplicationInput = {
    id?: string
    type: $Enums.DocumentType
    s3Key: string
    s3Url: string
    originalFilename: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string
    analysisStatus?: string
    createdAt?: Date | string
  }

  export type DocumentAnalysisCreateManyLoanApplicationInput = {
    id?: string
    riskScore: number
    recommendation: string
    riskLevel: string
    processingTimeMs: number
    documentsResult: JsonNullValueInput | InputJsonValue
    crossChecks: JsonNullValueInput | InputJsonValue
    riskFactors: JsonNullValueInput | InputJsonValue
    analyzedAt: Date | string
    createdAt?: Date | string
  }

  export type FraudFlagCreateManyLoanApplicationInput = {
    id?: string
    riskScore: number
    flaggedBy: string
    reasons?: FraudFlagCreatereasonsInput | string[]
    resolved?: boolean
    resolvedBy?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ComplianceReportCreateManyLoanApplicationInput = {
    id?: string
    reportType: string
    riskScore: number
    reportedAt: Date | string
    status: string
    referenceNumber?: string | null
    createdAt?: Date | string
  }

  export type DocumentUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    analysisStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAnalysisUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAnalysisUncheckedUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAnalysisUncheckedUpdateManyWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    recommendation?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    processingTimeMs?: IntFieldUpdateOperationsInput | number
    documentsResult?: JsonNullValueInput | InputJsonValue
    crossChecks?: JsonNullValueInput | InputJsonValue
    riskFactors?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FraudFlagUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FraudFlagUncheckedUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FraudFlagUncheckedUpdateManyWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    flaggedBy?: StringFieldUpdateOperationsInput | string
    reasons?: FraudFlagUpdatereasonsInput | string[]
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceReportUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceReportUncheckedUpdateWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceReportUncheckedUpdateManyWithoutLoanApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    riskScore?: IntFieldUpdateOperationsInput | number
    reportedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}