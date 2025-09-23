export type ResponseWrapper<TData = unknown, TMeta = unknown> = {
  data: TData;
  meta?: TMeta;
}