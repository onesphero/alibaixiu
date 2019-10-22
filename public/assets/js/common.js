$('#logout').on('click',()=>{
    var isConfirm=confirm('是否退出')
    if(isConfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:()=>{
          location.href='login.html'
        },
        error:()=>{
          alert('退出失败')
        }

      })
    }
  })
