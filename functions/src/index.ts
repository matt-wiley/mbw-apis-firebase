import { onRequest } from "firebase-functions/v2/https";

import { server as _helloWorld } from "./hello-world";
import { server as _fooBar } from "./foo-bar";

export const helloWorld = onRequest(_helloWorld);
export const fooBar = onRequest(_fooBar);
