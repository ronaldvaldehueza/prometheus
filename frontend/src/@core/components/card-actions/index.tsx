import React, { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';
import UiLoader from '../ui-loader'; // Corrected path
import { ChevronDown, RotateCw, X } from 'react-feather';
import { Card, CardHeader, CardTitle, Collapse } from 'reactstrap';

type ActionType = 'collapse' | 'remove' | 'reload';

interface CardActionsProps {
  title: string;
  actions: ActionType | ActionType[];
  children: React.ReactNode;
  collapseIcon?: React.ReactNode;
  reloadIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  endReload?: (callback: () => void) => void;
}

const CardActions: React.FC<CardActionsProps> = (props) => {
  const { title, actions, children, collapseIcon, reloadIcon, removeIcon, endReload } = props;

  const [reload, setReload] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [visibility, setVisibility] = useState<boolean>(true);

  const Icons: { [key in ActionType]: React.ReactNode } = {
    collapse: collapseIcon || <ChevronDown size={15} />,
    remove: removeIcon || <X size={15} />,
    reload: reloadIcon || <RotateCw size={15} />,
  };

  const callAction = (action: ActionType) => {
    switch (action) {
      case 'collapse':
        setCollapse(!collapse);
        break;
      case 'remove':
        setVisibility(false);
        break;
      case 'reload':
        setReload(true);
        break;
      default:
    }
  };

  const renderIcons = () => {
    if (Array.isArray(actions)) {
      return actions.map((action, i) => {
        const Tag = Icons[action] as React.ElementType;
        return (
          <Tag
            key={i}
            className={classnames('cursor-pointer', {
              'me-50': i < actions.length - 1,
            })}
            onClick={() => callAction(action)}
          />
        );
      });
    } else {
      const Tag = Icons[actions] as React.ElementType;
      return <Tag className='cursor-pointer' onClick={() => callAction(actions)} />;
    }
  };

  const removeReload = () => {
    setReload(false);
  };

  useEffect(() => {
    if (reload && endReload) {
      endReload(removeReload);
    }
  }, [reload, endReload]);

  const CollapseWrapper = (Array.isArray(actions) && actions.includes('collapse')) || actions === 'collapse' ? Collapse : Fragment;
  const BlockUiWrapper = (Array.isArray(actions) && actions.includes('reload')) || actions === 'reload' ? UiLoader : Fragment;

  return (
    <BlockUiWrapper
      {...((Array.isArray(actions) && actions.includes('reload')) || actions === 'reload'
        ? {
            blocking: reload,
          }
        : {})}
    >
      <Card
        className={classnames('card-action', {
          'd-none': !visibility,
        })}
      >
        <CardHeader>
          <CardTitle tag='h4'>{title}</CardTitle>
          <div className='action-icons'>{renderIcons()}</div>
        </CardHeader>
        <CollapseWrapper {...((Array.isArray(actions) && actions.includes('collapse')) || actions === 'collapse' ? { isOpen: collapse } : {})}>
          {children}
        </CollapseWrapper>
      </Card>
    </BlockUiWrapper>
  );
};

export default CardActions;
