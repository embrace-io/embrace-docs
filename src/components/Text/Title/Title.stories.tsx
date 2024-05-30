import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import Title from './Title';

export default {
  title: 'Components/Text/Title',
  component: Title,
} as Meta<typeof Title>;

const Template: StoryFn<typeof Title> = ({children, variant}) => (
  <Title variant={variant}>{children}</Title>
);
//title 1
export const Title1 = Template.bind({});
Title1.args = {
  children: 'Title1',
  variant: 'title1',
};

//title 2
export const Title2 = Template.bind({});
Title2.args = {
  children: 'Title2',
  variant: 'title2',
};

//title 3
export const Title3 = Template.bind({});
Title3.args = {
  children: 'Title3',
  variant: 'title3',
};

//title 4 with custom html element
export const CustomHTMLElement = Template.bind({});
CustomHTMLElement.args = {
  children: 'this is an H1 instead of a div!',
  variant: 'title3',
  htmlElement: 'h1',
};
