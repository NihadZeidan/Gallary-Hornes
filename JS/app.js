'use strict';
$('document').ready(function() {


    let ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }


    function HornForPageOne(horn) {
        this.title = horn.title;
        this.description = horn.description;
        this.image_url = horn.image_url;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        HornForPageOne.all.push(this);
    }

    HornForPageOne.all = [];







    function toRenderTheFirstPage() {
        $.ajax('data/page-1.json', ajaxSettings).then((data) => {

            data.forEach(function(horn) {
                let templateOne = $('#photo-template').html();

                let newHornForFirstPage = new HornForPageOne(horn);

                let html = Mustache.render(templateOne, newHornForFirstPage);
                $('main').append(html);

                // newHorn.renderFromClone();
                $('select').append(
                    `<option value = "${horn.keyword}"> ${horn.keyword} </option>`
                )

                // This to remove the defult template after render all the inctances:

            })
        })
    }

    toRenderTheFirstPage();

    //  To render the data from first JSON
    $("#first").on("click", function() {
        HornForPageOne.all = [];
        console.log(HornForPageOne.all);
        toRenderTheFirstPage();
    })



    //  To render the data from second JSON
    $("#second").on("click", function() {
        HornForPageOne.all = [];

        $.ajax('data/page-2.json', ajaxSettings).then((data) => {
            console.log(HornForPageOne.all);

            data.forEach(function(horn) {

                let newHornForSecondPage = new HornForPageOne(horn);
                let templateTwo = $('#photo-template').html();
                let html = Mustache.render(templateTwo, newHornForSecondPage);
                $('main').append(html);

                $('select').append(
                    `<option value = "${horn.keyword}"> ${horn.keyword} </option>`
                )

                // newHorn.renderFromClone();

            })

            // This to remove the defult template after render all the inctances:


        })
    })



    $('select').on("click", function(e) {
        let selected = $(this).val();
        console.log(selected);

        if (selected !== "default") {

            HornForPageOne.all.forEach(horn => {

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