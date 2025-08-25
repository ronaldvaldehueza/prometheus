import React, { Fragment, useState } from 'react';
import { Code } from 'react-feather';
import { Card, CardHeader, CardBody, CardTitle, Collapse } from 'reactstrap';

interface CardSnippetProps {
  title: string;
  children: React.ReactNode;
  noBody?: boolean;
  code: React.ReactNode;
  iconCode?: React.ReactNode;
  moreCardClasses?: string;
}

const CardSnippet: React.FC<CardSnippetProps> = (props) => {
  const { title, children, noBody, code, iconCode, moreCardClasses } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const IconCode = iconCode || <Code size={15} />;

  const toggle = () => setIsOpen(!isOpen);

  const Wrapper = noBody ? Fragment : CardBody;

  return (
    <Card className={`card-snippet ${moreCardClasses || ''}`}>
      <CardHeader>
        <CardTitle tag='h4'>{title}</CardTitle>
        <div className='views cursor-pointer' onClick={toggle}>
          {IconCode}
        </div>
      </CardHeader>
      <Wrapper>{children}</Wrapper>
      <Collapse isOpen={isOpen}>
        <CardBody>{code}</CardBody>
      </Collapse>
    </Card>
  );
};

export default CardSnippet;
