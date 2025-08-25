import React, { Fragment } from 'react';
import classnames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import Avatar from '../avatar'; // Corrected path
import { AvatarProps } from '../avatar'; // Assuming AvatarProps is exported from avatar

interface AvatarGroupItem extends AvatarProps {
  tag?: React.ElementType;
  title?: string;
  placement?: string; // From reactstrap Tooltip
  meta?: React.ReactNode;
}

interface AvatarGroupProps {
  data: AvatarGroupItem[];
  tag?: React.ElementType;
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const { data, tag: Tag = 'div', className } = props;

  const renderData = () => {
    return data.map((item, i) => {
      const ItemTag = item.tag || 'div';
      return (
        <Fragment key={i}>
          {item.title ? (
            <UncontrolledTooltip placement={item.placement as any} target={item.title.split(' ').join('-')}>
              {item.title}
            </UncontrolledTooltip>
          ) : null}
          {!item.meta ? (
            <Avatar
              tag={ItemTag}
              className={classnames('pull-up', {
                [item.className!]: item.className,
              })}
              {...(item.title ? { id: item.title.split(' ').join('-') } : {})}
              {...item}
              title={undefined}
              meta={undefined}
            />
          ) : null}
          {item.meta ? <ItemTag className='d-flex align-items-center ps-1'>{item.meta}</ItemTag> : null}
        </Fragment>
      );
    });
  };

  return (
    <Tag
      className={classnames('avatar-group', {
        [className!]: className,
      })}
    >
      {renderData()}
    </Tag>
  );
};

export default AvatarGroup;
