import React from 'react'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import Layout from './index'

jest.mock('../NewsLettersAdded/index.js', () => () => {
  return <div data-testid="mock-component" />
})

test('renders lazy-loaded component', async () => {
  const { getByTestId, getByText, getByLabelText } = render(<Layout />)

  // Initial loading state
  expect(getByText('Loading...')).toBeInTheDocument()
  const helloWorldElement = getByText('Welcome to our newsletter page')
  expect(helloWorldElement).toBeInTheDocument()

  const paraElement = getByLabelText('para')
  expect(paraElement).toBeInTheDocument()

  // Wait for lazy-loaded component to appear
  await waitForElementToBeRemoved(() => getByText('Loading...'))
  expect(getByTestId('mock-component')).toBeInTheDocument()
})
