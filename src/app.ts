export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      // tslint:disable-next-line:no-console
      console.error(err.message);
    },
  },
};
