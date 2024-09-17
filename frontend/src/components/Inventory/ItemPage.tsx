import React from 'react'

export const ItemPage = (props: any) => {
  if (!props.item) {
    return (
      <section>
        <h2>Item not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article>
        <h2>{props.item.name}</h2>
      </article>
    </section>
  )
}
