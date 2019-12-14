export function createActions(action: string) {
  return {
    REQUEST: action + "_REQUEST",
    SUCCESS: action + "_SUCCESS",
    FAIL: action + "_FAIL"
  };
}
