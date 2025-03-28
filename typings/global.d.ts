/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable  @typescript-eslint/no-empty-object-type */
// Use type safe message keys with `next-intl`
type Messages = typeof import('../messages/en.json');
declare interface IntlMessages extends Messages {}
