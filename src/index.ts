import { createClient, type NormalizeOAS } from "fets";
import type kratosSchema from "./openapi-kratos-schema.js";

export type KratosNormalized = NormalizeOAS<typeof kratosSchema>;
export const kratos = createClient<KratosNormalized>({
  endpoint: "http://localhost:4433",
});

const response = await kratos["/self-service/registration"].post({
  query: { flow: "flow-id" },
  json: {
    method: "password",
    traits: { email: "email" },
    password: "password",
  },
});

// `status` type should be `200 | 303 | 400 | 410 | 422` and not `200 | NotOkStatusCode`
if (response.status === 400) {
  const json = await response.json();

  // ...
}
