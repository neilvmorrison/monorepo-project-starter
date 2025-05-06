import { forwardRef, useMemo } from "react";
import type { CSSProperties } from "react";
import styles from "./avatar.module.css";

export type AvatarSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type AvatarShape = "circle" | "square";

export interface AvatarProps {
  /**
   * URL for the avatar image
   */
  src?: string;

  /**
   * Alt text for the avatar image
   */
  alt?: string;

  /**
   * Initials to display when no image is available
   */
  initials?: string;

  /**
   * Size of the avatar
   * @default 'medium'
   */
  size?: AvatarSize;

  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: AvatarShape;

  /**
   * Custom background color for initials avatar
   * If not provided, a color will be generated based on the initials
   */
  backgroundColor?: string;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * onClick handler
   */
  onClick?: () => void;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      initials,
      size = "medium",
      shape = "circle",
      backgroundColor,
      className = "",
      onClick,
    },
    ref
  ) => {
    // Generate a consistent color based on the initials if no backgroundColor is provided
    const bgColor = useMemo(() => {
      if (backgroundColor) return backgroundColor;
      if (!initials) return "#3366FF"; // Default to primary color if no initials

      // Generate a color based on the initials
      let hash = 0;
      for (let i = 0; i < initials.length; i++) {
        hash = initials.charCodeAt(i) + ((hash << 5) - hash);
      }

      // Convert hash to RGB color
      const hue = Math.abs(hash % 360);
      return `hsl(${hue}, 65%, 55%)`;
    }, [backgroundColor, initials]);

    // Format initials (max 2 characters)
    const formattedInitials = useMemo(() => {
      if (!initials) return "";

      // Take first two characters of initials, or just the first if only one character
      return initials.length > 1
        ? `${initials.charAt(0)}${initials.charAt(1)}`.toUpperCase()
        : initials.charAt(0).toUpperCase();
    }, [initials]);

    const avatarClasses = [
      styles.avatar,
      styles[size],
      styles[shape],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const style: CSSProperties =
      !src && initials ? { backgroundColor: bgColor } : {};

    return (
      <div
        ref={ref}
        className={avatarClasses}
        style={style}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {src ? (
          <img src={src} alt={alt} className={styles.image} />
        ) : (
          formattedInitials
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
