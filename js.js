$(document).ready(function () {
    var responseObj = [];
    var googleUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyB20e2VDjrUebicIJkA4MFH4WO4b8cEzQY&cx=013676722247143124300:dazj-lelyfy&num=3&q=';

    $('html').click(function () {
        $('#queryInputTb').focus()
    });

    $('body').on("keydown", '#queryInputTb', function (e) {
        if (e.which == 13 && $(this).val() !== "") {
            var Qvalue = $(this).val();
            if (parseInt(Qvalue) && responseObj[Qvalue]) {
                var win = window.open(responseObj.Qvalue, 'result');
                win.focus();

                addResult(Qvalue);
                clearField();
            }


            switch (Qvalue) {
                case 'c':
                case 'clear':
                    var me = $(this).parent().parent();
                    $('.gsh').html(me);
                    $(this).val('');
                    $(this).focus();
                    break;
                case 'h':
                case 'help':
                    addResult($('.helpMenu').html());
                    clearField($(this));
                    break;
                default:
                    callGoogle($(this));
                    break;
            }
        }
    });

    function callGoogle(q) {
        $.get(googleUrl + q.val(), function () {

            })
            .done(function (data) {
                if (typeof data['items'] !== 'undefined') {
                    data['items'].forEach(function (item, index) {
                        index = index + 1;
                        responseObj.push(item.link);

                        $('.gsh').append('' +
                            '<div class="result"><div class="index">'+index+'</div><div class="main"><div class="title"><a href="'+ item.link +'">' + item.title + '</a></div><div class="snippet">' + item.snippet + '</div><div class="link">' + item.link + '</div></div></div><hr>');
                    });
                } else {
                    addResult('No results');
                }

                clearField(q);
            })
            .fail(function () {
                addResult('Error - Perhaps too many searches? (max 100/person/day)');
                clearField(q);
            })
    }

    function addResult(r) {
        return $('.gsh').append('<div class="result">' + r + '</div>');
    }

    function clearField(input) {
        var needRetaining = input.val();
        $('.gsh').append(input.val('').parent().parent().clone());
        input.parent().html(needRetaining);
        $('input').focus();
    }
});