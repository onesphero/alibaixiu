$('#userForm').on('submit',function(){
    // alert(1314)
    var formData=$(this).serialize();
    // console.log($(this));
    
    
    console.log(formData);
    //新建用户功能
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:()=>{
            // console.log(res);
            
            location.reload()
        },
        error:()=>{
            // console.log(res);
            alert('提交失败')
            
        }
    })
    return false;
})
$('#avatar').on('change',function(){
    // console.log(this.files[0]);
    // console.log($(this));
    var formData=new FormData();
    formData.append('avatar',this.files[0])
    console.log(formData);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            // console.log(response);
            $('#preview').attr('src',response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
            
        }
    })
    
})
//做用户列表展示功能
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        console.log(response);
        var html=template('userTpl',{data:response})
        // console.log(html);
        $('#userBox').html(html)
    
    }
})
//点击编辑功能
$('#userBox').on('click','.edit',function(){
   var id= $(this).attr('data-id')
//    console.log(id);
   
    // $(selector).attr(attribute)
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(response){
            // console.log(response);
            var html=template('modifyTpl', response);
            console.log(html);
            $('#modifyBox').html(html)
            
            
        }
    })
})

$('#modifyBox').on('submit','#modifyForm',function(){
    var formData=$(this).serialize()
    console.log(formData);
    var id =$(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(response){
            location.reload()
        }
    })
    return false
})