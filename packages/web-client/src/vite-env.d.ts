declare module "design-system" {
  export * from "design-system/dist";
}

declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "design-system/dist/assets/index.css" {
  const styles: Record<string, string>;
  export default styles;
}
