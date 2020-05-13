$(function(){
  $('body').on('click','.remove-btn',function(){
    const id = $(this).attr('data-id');
    $.ajax({
        method:'DELETE',
        url:'/article/'+id,
        success:function(){
          console.log('Successfulley deleted');
          window.location.href = '/article';
        },
        error:function(err){
          console.log('Error Occured While Deleting',err);
        }
    });
  });
}); 