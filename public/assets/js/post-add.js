$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html=template('addTpl',{data:response})
        $('#category').html(html)
    }


})
$('#feature').on('change',function(){

    var file=this.files[0]
    var formData=new FormData()
    formData.append('cover',file)
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        contentType:false,
        processData:false,
        success:function(response){
            console.log(response);
            $('#thumbnail').val(response[0].cover)
            // $('#showTime').prop('src',response[0].cover).show()
        }

    })
})

$('#postForm').on('submit',function(){
    var formData=$(this).serialize()
    console.log(formData);
    
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(response){
            console.log(response);
            
            location.href='/admin/posts.html'
        }

    })
    return false;
})
//搜索twbs