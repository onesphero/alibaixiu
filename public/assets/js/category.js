$('#addCategory').on('submit',function(){
    var formData=$(this).serialize()
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){
            location.reload()
        }
    })
    
    return false;
})


//显示列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html=template('categoryListTpl',{data:response})
        $('#categroyBox').html(html)
    }
})
//修改功能 先事件委托点击事件 再在按钮上设置id，通过Ajax接口获取信息，返回对象信息渲染到页面中
$('#categroyBox').on('click','.edit',function(){
    var id=$(this).attr("data-id")
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(response){
            var html=template('modifyCategoryTpl',response)
            $('#formBox').html(html)
            
        }
    })
})
// 阻止默认提交 件委托给表单绑定提交事件（阻止默认提交），获取页面信息设置id通过Ajax提交，最后再刷新
$('#formBox').on('submit','#modifyCategory',function(response){
    var formData=$(this).serialize()
    var id=$(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(){
            location.reload()
        }
    })
    return false
})
$('#categroyBox').on('click','.delete',function(){
    var id =$(this).attr('data-id')
    if(confirm('删否？')){
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
                location.reload()
            }
        })
    }
})