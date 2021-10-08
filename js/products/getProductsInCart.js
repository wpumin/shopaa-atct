const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})

export default function getProductsInCart(cartList, productList) {
    let innerHTML = ''
    let duplicateIndex = []

    for (let i = 0; i < productList.length; i++) {
        duplicateIndex.push(0)
    }

    productList.map((itemOutside, indexOutside) => {
        cartList.map((itemInside, indexInside) => {
            if (itemInside.name == itemOutside.name) {
                duplicateIndex[indexOutside] += 1
            }
        })
    })

    duplicateIndex.map((item, index) => {
        if (item > 0) {
            innerHTML += `
                <div class="item">
                    <div class="product-image">
                        <img
                            src="${productList[index].image}"
                            alt="${productList[index].name}"
                        />
                    </div>
                    <div class="product-detail">
                        <h3>${productList[index].name}</h3>
                        <p>
                        ${productList[index].short_description}
                        </p>
                        <div class="show-more">
                            <p class="toggle-detail"  id="arrow-detail-${index}" onclick="toggleDetail(${index})">
                                Show more details
                            </p>
                            <p class="detail fade" id="detail-${index}">
                            ${productList[index].more_detail
                                .split('\n')
                                .join('<br />')}
                            </p>
                        </div>
                    </div>
                    <div class="product-price-and-panel">
                        <h3>${
                            productList[index].dollar.promotion_price
                                ? currencyFormat.format(
                                      productList[index].dollar.promotion_price
                                  )
                                : currencyFormat.format(
                                      productList[index].dollar.price
                                  )
                        } <span class="product-length">x${item}</span> </h3>
                        <button class="without-border" onclick="demoAlert()">
                            Remove
                        </button>
                    </div>
                </div>        `
        }
    })

    // console.log(duplicateIndex);
    return innerHTML
}
