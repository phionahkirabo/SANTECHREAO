/**
 * Created by quan on 2/23/2017.
 */
jQuery(function ($) {
    var button, data, ticket_button, post_id, template, loading_wrapper;
    ticket_button = $(".ticket-button");
    post_id = ticket_button.data("post-id");
    template = zk_ajax.template;

    if (post_id !== undefined) {
        template = template.replace("{{post_id}}", post_id);
        $("body").append(template);
        button = $("#submit_ticket");
        button.click(function () {
            loading_wrapper = $(".loading-wrapper");
            data = {
                action: 'submit_ticket',
                post_id: post_id,
                zk_name: $("input[name=zk_name]").val(),
                zk_email: $("input[name=zk_email]").val(),
                zk_phone: $("input[name=zk_phone]").val(),
                // nonce: zk_ajax.nonce
            };

            if (data.zk_name.length == 0) {
                alert("Please enter your name!");
                return;
            }

            if (data.zk_email.length == 0) {
                alert("Please enter your email!");
                return;
            }

            if (data.zk_phone.length == 0) {
                alert("Please enter your phone number!");
                return;
            }

            $.ajax({
                url: zk_ajax.ajaxurl,
                method: "POST",
                data: data,
                beforeSend: function () {
                    loading_wrapper.show();
                }
            })
                .done(function (msg) {
                    if ('message' in msg)
                        // if (msg['message'] !== undefined) {
                            $(document).find('.modal-dialog form').html(msg['message']);
                        // }
                    loading_wrapper.hide();
                });
        });
    }
});