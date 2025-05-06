// CSS modules declaration
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "design-system/dist/assets/index.css" {}

declare module "design-system" {
  // Re-export component props and types from design-system/dist
  export type {
    // Button types
    ButtonProps,
    ButtonVariant,
    ButtonSize,

    // Input types
    InputProps,
    InputVariant,
    InputSize,

    // Text types
    TextProps,
    TextVariant,
    TextElement,
    TextSize,
    TextWeight,
    TextAlign,

    // Surface types
    SurfaceProps,
    SurfaceVariant,
    SurfaceRadius,
    SurfaceElevation,

    // Accordion types
    AccordionProps,

    // Avatar types
    AvatarProps,
    AvatarSize,
    AvatarShape,

    // Theme
    Theme,
  } from "design-system/dist";

  // Component exports
  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  export const Input: React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  >;

  export const Text: React.FC<TextProps>;

  export const Surface: React.FC<SurfaceProps>;

  export const Accordion: React.FC<AccordionProps>;

  export const Avatar: React.FC<AvatarProps>;

  export const theme: Theme;

  // Re-export everything else from the original location
  export * from "design-system/dist";
}
