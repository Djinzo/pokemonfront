import type { RootState } from "./types";

import type { TypedUseSelectorHook } from "react-redux";
import { useSelector as useSelectorGeneric } from "react-redux";

const useSelector: TypedUseSelectorHook<RootState> = useSelectorGeneric;

export default useSelector;
