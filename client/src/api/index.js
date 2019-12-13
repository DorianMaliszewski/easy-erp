export function handleApiError(description, defaultValue) {
  return err => {
    console.log(description, err);
  };
}
