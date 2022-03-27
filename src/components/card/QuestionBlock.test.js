import React from "react";
import {fireEvent, render, cleanup, screen} from '@testing-library/react';
import QuestionBlock from "./QuestionBlock";
import {GERUND, INFINITIVE} from "./constants";

afterEach(cleanup);

it('card init state', () => {
  let words = new Map([['test', GERUND]]);
  render(<QuestionBlock words={words}/>);
  expect(screen.getByText('test')).toBeDefined();
  expect(screen.getByText('infinitive')).not.toHaveClass('chosen');
  expect(screen.getByText('gerund')).not.toHaveClass('chosen');
});

it('card empty words', () => {
  let words = new Map([]);
  render(<QuestionBlock words={words}/>);
  expect(screen.getByText('no words')).toBeDefined();
});


it('card infinitive select - success', () => {
  let words = new Map([['test', INFINITIVE]]);
  render(<QuestionBlock words={words} />);
  fireEvent.click(screen.getByText('infinitive'));
  expect(screen.getByText('infinitive')).toHaveClass('chosen');
  expect(screen.getByText('gerund')).not.toHaveClass('chosen');
});

it('card gerund select - success', () => {
  let words = new Map([['test', GERUND]]);
  render(<QuestionBlock words={words} />);
  fireEvent.click(screen.getByText('gerund'));
  expect(screen.getByText('infinitive')).not.toHaveClass('chosen');
  expect(screen.getByText('gerund')).toHaveClass('chosen');
});


it('card infinitive select - error', () => {
  let words = new Map([['test', GERUND]]);
  render(<QuestionBlock words={words} />);
  fireEvent.click(screen.getByText('infinitive'));
  expect(screen.getByText('infinitive')).toHaveClass('error');
  expect(screen.getByText('gerund')).not.toHaveClass('error');
});

it('card gerund select - error', () => {
  let words = new Map([['test', INFINITIVE]]);
  render(<QuestionBlock words={words} />);
  fireEvent.click(screen.getByText('gerund'));
  expect(screen.getByText('infinitive')).not.toHaveClass('error');
  expect(screen.getByText('gerund')).toHaveClass('error');
});

it('next card shown', (done) => {
  expect.assertions(4);

  let words = new Map([['test', INFINITIVE], ['test2', GERUND]]);
  render(<QuestionBlock words={words} nextQuestionTimeout={10}/>);
  fireEvent.click(screen.getByText('infinitive'));

  setTimeout(() => {
      expect(screen.queryByText('test')).toBeNull()
      expect(screen.getByText('test2')).toBeDefined();
      expect(screen.getByText('infinitive')).not.toHaveClass('chosen');
      expect(screen.getByText('gerund')).not.toHaveClass('chosen');
      done();
    },
    15
  );
});