'use strict';
$('document').ready(function() {

    let ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    let arrayForKey = [];

    HornForPageOne.all = [];


    function HornForPageOne(horn) {
        this.title = horn.title;
        this.description = horn.description;
        this.image_url = horn.image_url;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        HornForPageOne.all.push(this);
    }

    HornForPageOne.all = [];


    HornForPageOne.prototype.toRender = function() {
        let templateOne = $('#photo-template').html();
        let html = Mustache.render(templateOne, this);
        $('main').append(html);
    }


    HornForPageOne.prototype.toRender = function() {
        let templateOne = $('#photo-template').html();
        let html = Mustache.render(templateOne, this);
        $('main').append(html);
    }




    function renderFirst() {
        $.ajax('data/page-1.json', ajaxSettings).then((data) => {
            data.forEach((horn, i) => {

                let newHorn = new HornForPageOne(horn);
                newHorn.toRender();

                if (!arrayForKey.includes(HornForPageOne.all[i].keyword)) {
                    arrayForKey.push(HornForPageOne.all[i].keyword)
                }
            })

            for (let i = 0; i < arrayForKey.length; i++) {
                $('select').append(
                    `<option value = "${arrayForKey[i]}"> ${arrayForKey[i]} </option>`
                )
            }
        })
        HornForPageOne.all = [];
    }

    }

    renderFirst();


    //  To render the data from first JSON
    $("#first").on("click", function() {
        HornForPageOne.all = [];
        $('select').empty();
        renderFirst();

    })






$('select').on("click", function(e) {
    let selected = $(this).val();
    console.log(selected);

    if (selected !== "default") {


        if (horn.keyword === selected) {

            // this meanes if the keyword is the same to the selected will add filtered istead of the class keyword and it will result in class = filtered filtered  (we identified the defalute filtered class as (display block))

            $(`.${selected}`).addClass('filtered');

        } else {

            // if not matching will remove the filtered from the class it self and will keep the keyword it self (we identified the defalute div as a (display none) in CSS)

            $(`.${horn.keyword}`).removeClass('filtered');

        }



