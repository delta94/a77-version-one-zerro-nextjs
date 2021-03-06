// Function for cloning objects and arrays
export function clone(data: any): any {
  return JSON.parse(JSON.stringify(data));
}
export function error<T>(message: string): Promise<T> {
  return Promise.reject<T>(new Error(message));
}
