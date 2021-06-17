export default {
  addShopCar(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.shopCarList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1');
      } else {
        payload.count = 1
        context.commit('addToShopcar', payload)
        resolve('添加新的商品');

      }
    })
  }
}