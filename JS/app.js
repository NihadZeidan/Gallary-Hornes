'use strict';
$('document').ready(function() {


    function Horn(horn) {
        this.title = horn.title;
        this.description = horn.description;
        this.image = horn.image_url;
        this.keyword = horn.keyword;
    }


    Horn.prototype.renderFromClone = function() {
        let template = $('#photo-template').clone();
        template.find("h2").text(this.title);
        template.find('p').text(this.description);
        template.find('img').attr("src", this.image);
        template.removeAttr('id')
        $('main').append(template);

    }


    Horn.prototype.addToSelect = function() {
        $('select').append(
            `<option value="${this.keyword}"> ${this.keyword} </option>`
        )

        // $('option').on("click", function () {
        //     $("div").remove();
        // })


    }





    let ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }



    $.ajax('data/page-1.json', ajaxSettings).then((data) => {
        data.forEach(function(horn, index) {
            let newHorn = new Horn(horn);
            newHorn.renderFromClone();





            if (horn.keyword != $("option").attr('value')) {
                newHorn.addToSelect();
                console.log($("option").attr('value'));
            } else {
                $('option').hide();
            }

            // console.log(keyWord);

        })



        // This to remove the defult template after render all the inctances:
        $('#photo-template').remove()


        // let keyWord = [];


    })


})