export function createActions(action) {
  return {
    REQUEST: action + "_REQUEST",
    SUCCESS: action + "_SUCCESS",
    FAIL: action + "_FAIL"
  };
}
