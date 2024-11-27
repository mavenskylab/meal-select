/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n      query GetItems($search: String, $store: String) {\n        itemCollection(\n          filter: { name: { ilike: $search }, store: { eq: $store } }\n        ) {\n          edges {\n            node {\n              id\n              name\n              store\n              count\n            }\n          }\n        }\n      }\n    ": types.GetItemsDocument,
    "\n        mutation AddItem($name: String!, $store: String!, $count: Int) {\n          insertIntoItemCollection(\n            objects: [{ name: $name, store: $store, count: $count }]\n          ) {\n            affectedCount\n          }\n        }\n      ": types.AddItemDocument,
    "\n        mutation UpdateItem(\n          $id: BigInt\n          $name: String!\n          $store: String!\n          $count: Int!\n        ) {\n          updateItemCollection(\n            filter: { id: { eq: $id } }\n            set: { name: $name, store: $store, count: $count }\n          ) {\n            records {\n              id\n              name\n              store\n              count\n            }\n          }\n        }\n      ": types.UpdateItemDocument,
    "\n        mutation ClearItem($id: BigInt, $count: Int!) {\n          updateItemCollection(\n            filter: { id: { eq: $id } }\n            set: { count: $count }\n          ) {\n            affectedCount\n          }\n        }\n      ": types.ClearItemDocument,
    "\n      query GetMeals($search: String) {\n        mealCollection(filter: { name: { ilike: $search } }) {\n          edges {\n            node {\n              id\n              name\n              mealItemCollection {\n                edges {\n                  node {\n                    item {\n                      id\n                      name\n                    }\n                    count\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ": types.GetMealsDocument,
    "\n        mutation AddMeal($name: String!) {\n          insertIntoMealCollection(objects: [{ name: $name }]) {\n            records {\n              id\n            }\n          }\n        }\n      ": types.AddMealDocument,
    "\n          mutation AddMealItem($objects: [MealItemInsertInput!]!) {\n            insertIntoMealItemCollection(objects: $objects) {\n              affectedCount\n            }\n          }\n        ": types.AddMealItemDocument,
    "\n        mutation ClearItems($id: BigInt) {\n          deleteFromMealItemCollection(filter: { meal_id: { eq: $id } }) {\n            affectedCount\n          }\n        }\n      ": types.ClearItemsDocument,
    "\n        mutation UpdateMealItems($mealItemCollection: [MealItemInsertInput!]!) {\n          insertIntoMealItemCollection(objects: $mealItemCollection) {\n            affectedCount\n          }\n        }\n      ": types.UpdateMealItemsDocument,
    "\n        mutation UpdateMeal($id: BigInt, $name: String!) {\n          updateMealCollection(\n            filter: { id: { eq: $id } }\n            set: { name: $name }\n          ) {\n            records {\n              id\n              name\n              mealItemCollection {\n                edges {\n                  node {\n                    item {\n                      id\n                      name\n                    }\n                    count\n                  }\n                }\n              }\n            }\n          }\n        }\n      ": types.UpdateMealDocument,
    "\n        mutation DeleteMeal($id: BigInt) {\n          deleteFromMealCollection(filter: { id: { eq: $id } }) {\n            affectedCount\n          }\n        }\n      ": types.DeleteMealDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetItems($search: String, $store: String) {\n        itemCollection(\n          filter: { name: { ilike: $search }, store: { eq: $store } }\n        ) {\n          edges {\n            node {\n              id\n              name\n              store\n              count\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetItems($search: String, $store: String) {\n        itemCollection(\n          filter: { name: { ilike: $search }, store: { eq: $store } }\n        ) {\n          edges {\n            node {\n              id\n              name\n              store\n              count\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation AddItem($name: String!, $store: String!, $count: Int) {\n          insertIntoItemCollection(\n            objects: [{ name: $name, store: $store, count: $count }]\n          ) {\n            affectedCount\n          }\n        }\n      "): (typeof documents)["\n        mutation AddItem($name: String!, $store: String!, $count: Int) {\n          insertIntoItemCollection(\n            objects: [{ name: $name, store: $store, count: $count }]\n          ) {\n            affectedCount\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation UpdateItem(\n          $id: BigInt\n          $name: String!\n          $store: String!\n          $count: Int!\n        ) {\n          updateItemCollection(\n            filter: { id: { eq: $id } }\n            set: { name: $name, store: $store, count: $count }\n          ) {\n            records {\n              id\n              name\n              store\n              count\n            }\n          }\n        }\n      "): (typeof documents)["\n        mutation UpdateItem(\n          $id: BigInt\n          $name: String!\n          $store: String!\n          $count: Int!\n        ) {\n          updateItemCollection(\n            filter: { id: { eq: $id } }\n            set: { name: $name, store: $store, count: $count }\n          ) {\n            records {\n              id\n              name\n              store\n              count\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation ClearItem($id: BigInt, $count: Int!) {\n          updateItemCollection(\n            filter: { id: { eq: $id } }\n            set: { count: $count }\n          ) {\n            affectedCount\n          }\n        }\n      "): (typeof documents)["\n        mutation ClearItem($id: BigInt, $count: Int!) {\n          updateItemCollection(\n            filter: { id: { eq: $id } }\n            set: { count: $count }\n          ) {\n            affectedCount\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetMeals($search: String) {\n        mealCollection(filter: { name: { ilike: $search } }) {\n          edges {\n            node {\n              id\n              name\n              mealItemCollection {\n                edges {\n                  node {\n                    item {\n                      id\n                      name\n                    }\n                    count\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetMeals($search: String) {\n        mealCollection(filter: { name: { ilike: $search } }) {\n          edges {\n            node {\n              id\n              name\n              mealItemCollection {\n                edges {\n                  node {\n                    item {\n                      id\n                      name\n                    }\n                    count\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation AddMeal($name: String!) {\n          insertIntoMealCollection(objects: [{ name: $name }]) {\n            records {\n              id\n            }\n          }\n        }\n      "): (typeof documents)["\n        mutation AddMeal($name: String!) {\n          insertIntoMealCollection(objects: [{ name: $name }]) {\n            records {\n              id\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n          mutation AddMealItem($objects: [MealItemInsertInput!]!) {\n            insertIntoMealItemCollection(objects: $objects) {\n              affectedCount\n            }\n          }\n        "): (typeof documents)["\n          mutation AddMealItem($objects: [MealItemInsertInput!]!) {\n            insertIntoMealItemCollection(objects: $objects) {\n              affectedCount\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation ClearItems($id: BigInt) {\n          deleteFromMealItemCollection(filter: { meal_id: { eq: $id } }) {\n            affectedCount\n          }\n        }\n      "): (typeof documents)["\n        mutation ClearItems($id: BigInt) {\n          deleteFromMealItemCollection(filter: { meal_id: { eq: $id } }) {\n            affectedCount\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation UpdateMealItems($mealItemCollection: [MealItemInsertInput!]!) {\n          insertIntoMealItemCollection(objects: $mealItemCollection) {\n            affectedCount\n          }\n        }\n      "): (typeof documents)["\n        mutation UpdateMealItems($mealItemCollection: [MealItemInsertInput!]!) {\n          insertIntoMealItemCollection(objects: $mealItemCollection) {\n            affectedCount\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation UpdateMeal($id: BigInt, $name: String!) {\n          updateMealCollection(\n            filter: { id: { eq: $id } }\n            set: { name: $name }\n          ) {\n            records {\n              id\n              name\n              mealItemCollection {\n                edges {\n                  node {\n                    item {\n                      id\n                      name\n                    }\n                    count\n                  }\n                }\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        mutation UpdateMeal($id: BigInt, $name: String!) {\n          updateMealCollection(\n            filter: { id: { eq: $id } }\n            set: { name: $name }\n          ) {\n            records {\n              id\n              name\n              mealItemCollection {\n                edges {\n                  node {\n                    item {\n                      id\n                      name\n                    }\n                    count\n                  }\n                }\n              }\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation DeleteMeal($id: BigInt) {\n          deleteFromMealCollection(filter: { id: { eq: $id } }) {\n            affectedCount\n          }\n        }\n      "): (typeof documents)["\n        mutation DeleteMeal($id: BigInt) {\n          deleteFromMealCollection(filter: { id: { eq: $id } }) {\n            affectedCount\n          }\n        }\n      "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;