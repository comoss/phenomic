import test from "ava"
import React, { createElement } from "react"
import { createRenderer } from "react-addons-test-utils"
import Link from "../"

import expect from "expect"
import expectJSX from "expect-jsx"

expect.extend(expectJSX)

const renderer = (...args) => {
  const render = createRenderer()
  render.render(...args)
  return render.getRenderOutput()
}

test("should render <a> tag", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/",
        className: "foo",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: () => false,
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo"
      onClick={ function noRefCheck() {} }
      style={ { } }
    >
      <span />
    </a>
  )
})

test("should allow passing props to <a> tag", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/",
        className: "foo",
        foo: "bar",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: () => false,
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo"
      foo="bar"
      onClick={ function noRefCheck() {} }
      style={ { } }
    >
      <span />
    </a>
  )
})

test("should have activeClassName when url matched", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/",
        className: "foo",
        activeClassName: "bar",
        foo: "bar",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: ({ pathname }) => (pathname === "/"),
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo bar"
      foo="bar"
      onClick={ function noRefCheck() {} }
      style={ { } }
    >
      <span />
    </a>
  )
})

test("should have activeClassName when url matched with index.html", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/",
        className: "foo",
        activeClassName: "bar",
        foo: "bar",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: ({ pathname }) => (pathname === "/index.html"),
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo bar"
      foo="bar"
      onClick={ function noRefCheck() {} }
      style={ { } }
    >
      <span />
    </a>
  )
})

test("should not have undefined when no activeClassName props", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/",
        className: "foo",
        foo: "bar",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: ({ pathname }) => (pathname === "/"),
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo"
      foo="bar"
      onClick={ function noRefCheck() {} }
      style={ { } }
    >
      <span />
    </a>
  )
})
