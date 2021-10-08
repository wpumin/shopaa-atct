import getProducts from '../products/getProducts.js'
import getProductsInCart from '../products/getProductsInCart.js'

let appleMacList = []
let appleIphoneList = []
let appleIpadList = []
let huaweiSmartphoneList = []
let productList = []
let cartList = []
const productsMacList = document.querySelector('.mac-list')
const productsIphoneList = document.querySelector('.iphone-list')
const productsIpadList = document.querySelector('.ipad-list')
const productsHuaweiSmartphoneList = document.querySelector(
    '.huawei-smartphone-list'
)
const addToCartButton = document.getElementsByClassName('add-to-cart')
const cartListLength = document.querySelector('.circle')
const totalPrice = document.querySelector('#total-price')
const cartListInModal = document.querySelector('.cart-list')
const cart = document.querySelector('.cart')
const checkout = document.querySelector('.checkout')
const backdropModal = document.querySelector('.backdrop-modal')
const containerResponse = document.querySelector('.container-reponse')
const modalResponse = document.querySelector('.modal-response')

const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})

checkout.innerHTML = 'close'

checkout.onclick = () => {
    if (!cartList.length) {
        backdropModal.style.opacity = 0
        backdropModal.style.pointerEvents = 'none'
    } else {
        demoAlert()
    }
}

containerResponse.onclick = () => {
    setTimeout(() => {
        containerResponse.classList.add('hide')
    }, 250)
    containerResponse.style.opacity = 0
}

modalResponse.onclick = () => {
    setTimeout(() => {
        containerResponse.classList.add('hide')
    }, 250)
    containerResponse.style.opacity = 0
}

const sumTotalPrice = (items) => {
    let sum = 0
    items.map((item) => {
        if (item.dollar.promotion_price) {
            sum += Number(item.dollar.promotion_price)
        } else {
            sum += Number(item.dollar.price)
        }
    })
    totalPrice.innerHTML = currencyFormat.format(sum)
}

fetch('../../json/products.json')
    .then((response) => response.json())
    .then((data) => {
        appleMacList = [...data.products.apple.mac]
        appleIphoneList = [...data.products.apple.iphone]
        appleIpadList = [...data.products.apple.ipad]
        huaweiSmartphoneList = [...data.products.huawei.smartphone]
        productList = productList.concat(
            appleMacList,
            appleIphoneList,
            appleIpadList,
            huaweiSmartphoneList
        )
        // console.log(productList)

        let appleMacInnerHTML = getProducts(appleMacList)
        let appleIphoneInnerHTML = getProducts(appleIphoneList)
        let appleIpadInnerHTML = getProducts(appleIpadList)
        let huaweiSmartphoneInnerHTML = getProducts(huaweiSmartphoneList)

        productsMacList.innerHTML = appleMacInnerHTML
        productsIphoneList.innerHTML = appleIphoneInnerHTML
        productsIpadList.innerHTML = appleIpadInnerHTML
        productsHuaweiSmartphoneList.innerHTML = huaweiSmartphoneInnerHTML
    })
    .then(() => {
        const lengthOfButton = addToCartButton.length
        for (let i = 0; i < lengthOfButton; i++) {
            addToCartButton[i].onclick = () => {
                if (cartList != null) {
                    cart.classList.add('motivate-to-click')
                    cartListLength.classList.remove('hide')
                    checkout.innerHTML = 'check out'
                } else {
                    checkout.innerHTML = 'close'
                }
                cartList.push(productList[i])
                sumTotalPrice(cartList)
                document.getElementById('cart-list-length').innerHTML =
                    cartList.length
                cartListInModal.innerHTML = getProductsInCart(
                    cartList,
                    productList
                )
                containerResponse.classList.remove('hide')
                containerResponse.style.opacity = 1
            }
        }
    })
    .catch((error) => console.error(error))
