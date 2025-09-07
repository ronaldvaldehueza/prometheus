import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { Badge } from 'reactstrap';

type AvatarSize = 'sm' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';
type AvatarColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'
  | 'dark'
  | 'light-primary'
  | 'light-secondary'
  | 'light-success'
  | 'light-danger'
  | 'light-info'
  | 'light-warning'
  | 'light-dark';

export interface AvatarProps {
  img?: string | false;
  size?: AvatarSize;
  icon?: React.ReactNode;
  color?: AvatarColor;
  status?: AvatarStatus;
  badgeUp?: boolean;
  content?: string;
  tag?: React.ElementType;
  initials?: boolean;
  imgWidth?: string | number;
  className?: string;
  badgeText?: string;
  imgHeight?: string | number;
  badgeColor?: AvatarColor;
  imgClassName?: string;
  contentStyles?: React.CSSProperties;
  [key: string]: any;
}

const Avatar = forwardRef<HTMLElement, AvatarProps>((props, ref) => {
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content = '',
    tag: Tag = 'div',
    initials,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  const getInitials = (str: string): string => {
    const results: string[] = [];
    const wordArray = str.split(' ');
    wordArray.forEach(e => {
      if (e) {
        results.push(e[0]);
      }
    });
    return results.join('');
  };

  return (
    <Tag
      className={classnames('avatar', {
        [className!]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content) : content}
          {icon || null}
          {badgeUp ? (
            <Badge color={badgeColor || 'primary'} className='badge-sm badge-up' pill>
              {badgeText || '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName!]: imgClassName,
          })}
          src={img}
          alt='avatarImg'
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </Tag>
  );
});

export default Avatar;
