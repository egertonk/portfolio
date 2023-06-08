export const SiteHeader: React.FC<
  React.PropsWithChildren<{
    header: string;
  }>
> = (props) => {
  return (
    <h1 className="font-extrabold dark:bg-blue-900 dark:text-blue-300 bg-blue-100 text-blue-800 text-2xl font-semibold md:text-3xl">
      {props.header}
    </h1>
  );
};
