import React from 'react'

export default function layout(props: LayoutProps<'/blog/[id]'>) {
  return (
    <>
        {props.children}
    </>
  )
}
