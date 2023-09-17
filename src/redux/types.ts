import type { store } from "./configure";

import type { Action, ThunkAction } from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
