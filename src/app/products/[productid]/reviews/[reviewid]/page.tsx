import React from 'react'

export default async function page({
    params,
}:{
    params:Promise<{ productid: string; reviewid: string}>;
}) {
  const {productid, reviewid} = await params
  return (
    <div>
      Producto {productid} y la review {reviewid}
    </div>
  )
}
