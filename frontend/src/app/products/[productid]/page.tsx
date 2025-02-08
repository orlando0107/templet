import React from 'react'

export default async function Page({
    params
}: {
    params: Promise<{ productid: string }>
}) {
    const productid = (await params).productid
    return (
        <div>
            <p>Producto Número: {productid}</p>
        </div>
    )
}
