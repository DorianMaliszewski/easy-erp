export function handleApiError(description: string, defaultValue: any) {
  return (err: any) => {
    console.log(description, err);
  };
}
