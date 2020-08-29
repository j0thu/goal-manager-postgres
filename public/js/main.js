$(document).ready(function(){
    $('.delete-goal').on('click', function(){
        var id = $(this).data('id');
        var url = '/delete/'+id;
        if(confirm('Delete Goal?')){
            $.ajax({
                url: url,
                type:'DELETE',
                success: function(result){
                    console.log('Deleting Goal..');
                    window.location.href = '/';
                },
                error: function(err){
                    console.log(err);
                }
            })
        }
    })

    $('.edit-goal').on('click', function(){
        $('#edit-form-goal').val($(this).data('goal'));
        $('#edit-form-deadline').val($(this).data('deadline'));
        $('#edit-form-thoughts').val($(this).data('thoughts'));
        $('#edit-form-id').val($(this).data('id'));

    })
})
