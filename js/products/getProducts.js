const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})

export default function getProducts(items) {
    let innerHTML = ''
    items.map((item) => {
        innerHTML += `
            <div class="item">
                <img
                    src="${item.image}"
                    class="product-image"
                />
                <h3 class="product-name">${item.name}</h3>
                <h4 class="product-price">Price: <span class="${
                    item.dollar.promotion_price && 'line-through'
                }">${currencyFormat.format(item.dollar.price)}</span>
                ${
                    item.dollar.promotion_price
                        ? `<span class="promotion-price">Promotion: ${currencyFormat.format(
                              item.dollar.promotion_price
                          )}</span>`
                        : ''
                }

                </h4>
                <div class="add-to-cart">
                    <button class="without-border">Add to cart</button>
                </div>
            </div>
          `
    })
    return innerHTML
}
