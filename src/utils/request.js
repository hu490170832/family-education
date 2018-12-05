
export function request(name, data) {
  return new Promise((resolve,reject)=>{
    wx.cloud.callFunction({
        name,
        data,
      }).then(res => {
        resolve(res.result)
      }).catch(err => {
        reject(err)
        wx.showToast({
          title: err.errMsg,
          duration: 2000
        })
    })
  })
}