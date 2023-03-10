/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.9.1.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as actions_createPaymentIntent from "../actions/createPaymentIntent";
import type * as addPayment from "../addPayment";
import type * as addProperty from "../addProperty";
import type * as editPropertyById from "../editPropertyById";
import type * as getApartmentURI from "../getApartmentURI";
import type * as getHouseURI from "../getHouseURI";
import type * as getName from "../getName";
import type * as getPaymentsFromUser from "../getPaymentsFromUser";
import type * as getPaymentsToUser from "../getPaymentsToUser";
import type * as getPropertiesByOwner from "../getPropertiesByOwner";
import type * as getPropertiesForTenant from "../getPropertiesForTenant";
import type * as getPropertyById from "../getPropertyById";
import type * as listMessagesByUser from "../listMessagesByUser";
import type * as makePayment from "../makePayment";
import type * as sendMessage from "../sendMessage";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  "actions/createPaymentIntent": typeof actions_createPaymentIntent;
  addPayment: typeof addPayment;
  addProperty: typeof addProperty;
  editPropertyById: typeof editPropertyById;
  getApartmentURI: typeof getApartmentURI;
  getHouseURI: typeof getHouseURI;
  getName: typeof getName;
  getPaymentsFromUser: typeof getPaymentsFromUser;
  getPaymentsToUser: typeof getPaymentsToUser;
  getPropertiesByOwner: typeof getPropertiesByOwner;
  getPropertiesForTenant: typeof getPropertiesForTenant;
  getPropertyById: typeof getPropertyById;
  listMessagesByUser: typeof listMessagesByUser;
  makePayment: typeof makePayment;
  sendMessage: typeof sendMessage;
}>;
