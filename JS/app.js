'use strict';
$('document').ready(function() {

    let ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    let arrayForKey = [];
    Horns.all = [];

    function Horns(horn) {
        this.title = horn.title;
        this.description = horn.description;
        this.image_url = horn.image_url;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        Horns.all.push(this);
    }


    Horns.prototype.toRender = function() {

        let templateOne = $('#template').html();
        let html = Mustache.render(templateOne, this);
        $('main').append(html);

    }

    function refreshTheSection() {
        $('section').empty();
        $("section").append(
            `
            <template id="template" type="text/x-tmpl-mustache" class="">
            <h2> {{title}} #{{horns}}</h2>
            <img src="{{image_url}}" alt="" />
            <p> {{description}} </p>
        </template>`
        )

    }

    function renderAjax(num) {
        arrayForKey = [];
        Horns.all = [];
        $('option').remove();
        refreshTheSection();



        $.ajax(`data/page-${num}.json`, ajaxSettings).then((data) => {
            data.forEach((horn, i) => {
                let newHorn = new Horns(horn);
                newHorn.toRender();

                if (!arrayForKey.includes(Horns.all[i].keyword)) {
                    arrayForKey.push(Horns.all[i].keyword)
                    $('select').append(
                        `<option value = "${horn.keyword}"> ${horn.keyword} </option>`
                    )
                }
            })


        })
    }

    function handleSort() {
        $('input').on('change', function() {
            let value = $(this).val();

            if (value === "title") {
                sortByName()
            }
        })
        render()
    }

    handleSort();

    function sortByName() {

        Horns.all.sort((a, b) => {
            if (a.value < b.value) {
                return -1;

            } else if (b.value < a.value) {
                return 1;
            }

        })
        render(Horns.all)
    }

    function render() {
        Horns.all.forEach(obj => {
            obj.toRender();
        })
    }

    function clickOnPage() {
        $('button').on("click", function() {
            let id = $(this).attr('id');
            renderAjax(id);
        })
    }
    clickOnPage();
    renderAjax(1);
    // filteration(Horns.all);






    // function filteration(arr) {

    //     $('select').on("click", function() {
    //         let selectedKeyword = $(this).val();

    //         arr.forEach(obj => {

    //             if (obj.keyword === selectedKeyword) {

    //                 $(`.${selectedKeyword}`).attr("class", 'show');
    //             } else {
    //                 $(`.${selectedKeyword}`).attr('class', " ")
    //             }
    //         })
    //     })
    // }





})