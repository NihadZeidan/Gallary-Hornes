'use strict';
$('document').ready(function() {


    let ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }


    function Horn(horn) {
        this.title = horn.title;
        this.description = horn.description;
        this.image = horn.image_url;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        Horn.all.push(this);
    }

    Horn.all = [];

    Horn.prototype.renderFromClone = function() {
        let template = $('#photo-template').clone();
        template.find("h2").text(`${this.title}   #${this.horns}`);
        template.find('p').text(this.description);
        template.find('img').attr("src", this.image);
        template.attr('class', `${this.keyword}  filtered`);
        $('main').append(template);

    }


    Horn.prototype.addToSelect = function() {
        $('select').append(

            `<option value = "${this.keyword}"> ${this.keyword} </option>`
        )
    }



    $.ajax('data/page-1.json', ajaxSettings).then((data) => {
        data.forEach(function(horn) {
            let newHorn = new Horn(horn);
            newHorn.renderFromClone();
            newHorn.addToSelect();
        })



        // This to remove the defult template after render all the inctances:
        $('#photo-template').remove()


    })



    $('select').on("click", function(e) {
        let selected = $(this).val();
        console.log(selected);

        if (selected !== "default") {

            Horn.all.forEach(horn => {

                    if (horn.keyword === selected) {

                        // this meanes if the keyword is the same to the selected will add filtered istead of the class keyword and it will result in class = filtered filtered  (we identified the defalute filtered class as (display block))

                        $(`.${selected}`).addClass('filtered');

                    } else {

                        // if not matching will remove the filtered from the class it self and will keep the keyword it self (we identified the defalute div as a (display none) in CSS)

                        $(`.${horn.keyword}`).removeClass('filtered');

                    }


                }


            )
        }
    })


})