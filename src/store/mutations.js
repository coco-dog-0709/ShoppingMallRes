export default {
  addCounter(state, payload) {
    payload.count++
  },
  addToShopcar(state, payload) {
    payload.checked = true
    state.shopCarList.push(payload)
  }

}
