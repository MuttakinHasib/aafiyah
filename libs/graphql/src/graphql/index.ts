import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { fetcher } from '../configs';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type CreateProductInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String']['output'];
  user: UserWithoutPassword;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createUser: Scalars['String']['output'];
  login: LoginResponse;
  logout: LogoutResponse;
  removeProduct: Product;
  removeUser: User;
  updateProduct: Product;
  updateUser: Scalars['String']['output'];
  uploadSingleFile: UploadResponse;
};

export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRemoveProductArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationUploadSingleFileArgs = {
  file: Scalars['Upload']['input'];
};

export type Product = {
  __typename?: 'Product';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: UserWithoutPassword;
  product: Product;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};

export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateProductInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  access_mode: Scalars['String']['output'];
  bytes: Scalars['Float']['output'];
  created_at: Scalars['String']['output'];
  etag: Scalars['String']['output'];
  format: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  original_filename: Scalars['String']['output'];
  pages: Scalars['Float']['output'];
  placeholder: Scalars['Boolean']['output'];
  public_id: Scalars['String']['output'];
  resource_type: Scalars['String']['output'];
  secure_url: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
  version: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  avatar: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResponse'; message: string };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout: { __typename: 'LogoutResponse'; message: string };
};

export type RegisterMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation'; createUser: string };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: string;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename: 'UserWithoutPassword';
    avatar: string;
    created_at: any;
    email: string;
    id: string;
    name: string;
    role?: string | null;
    dob?: any | null;
    gender?: string | null;
    phone?: string | null;
    updated_at: any;
  };
};

export const LoginDocument = /*#__PURE__*/ `
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    message
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['Login'],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        variables
      )(),
    options
  );
useLoginMutation.getKey = () => ['Login'];

useLoginMutation.fetcher = (
  variables: LoginMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    variables,
    options
  );
export const LogoutDocument = /*#__PURE__*/ `
    mutation logout {
  logout {
    message
    __typename
  }
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LogoutMutation,
    TError,
    LogoutMutationVariables,
    TContext
  >
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    ['logout'],
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        variables
      )(),
    options
  );
useLogoutMutation.getKey = () => ['logout'];

useLogoutMutation.fetcher = (
  variables?: LogoutMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    variables,
    options
  );
export const RegisterDocument = /*#__PURE__*/ `
    mutation Register($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput)
}
    `;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    ['Register'],
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        variables
      )(),
    options
  );
useRegisterMutation.getKey = () => ['Register'];

useRegisterMutation.fetcher = (
  variables: RegisterMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    variables,
    options
  );
export const UpdateUserDocument = /*#__PURE__*/ `
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput)
}
    `;
export const useUpdateUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >(
    ['updateUser'],
    (variables?: UpdateUserMutationVariables) =>
      fetcher<UpdateUserMutation, UpdateUserMutationVariables>(
        UpdateUserDocument,
        variables
      )(),
    options
  );
useUpdateUserMutation.getKey = () => ['updateUser'];

useUpdateUserMutation.fetcher = (
  variables: UpdateUserMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    variables,
    options
  );
export const MeDocument = /*#__PURE__*/ `
    query me {
  me {
    avatar
    created_at
    email
    id
    name
    role
    dob
    gender
    phone
    updated_at
    __typename
  }
}
    `;
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ['me'] : ['me', variables],
    fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
    options
  );

useMeQuery.getKey = (variables?: MeQueryVariables) =>
  variables === undefined ? ['me'] : ['me', variables];
useMeQuery.fetcher = (
  variables?: MeQueryVariables,
  options?: RequestInit['headers']
) => fetcher<MeQuery, MeQueryVariables>(MeDocument, variables, options);
