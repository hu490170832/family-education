
export function request(name, data) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve,reject)=>{
    wx.cloud.callFunction({
        name,
        data,
      }).then(res => {
        resolve(res.result)
        wx.hideLoading()
      }).catch(err => {
        reject(err)
        wx.showToast({
          title: err.errMsg,
          duration: 2000
        })
    })
  })
}