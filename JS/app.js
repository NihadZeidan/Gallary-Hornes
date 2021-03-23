'use strict';
$('document').ready(function() {


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




            let ajaxSettings = {
                method: 'get',
                dataType: 'json'
            }

            $.ajax('data/page-1.json', ajaxSettings).then((data) => {
                data.forEach(function(horn, index) {
                    let newHorn = new Horn(horn);
                    newHorn.renderFromClone();
                    newHorn.addToSelect();





                    if (horn.keyword != $("option").attr('value')) {
                        console.log($("option").attr('value'));
                    } else {
                        $('option').hide();
                    }

                })



                // This to remove the defult template after render all the inctances:
                $('#photo-template').remove()


            })



            $('select').on("click", function(e) {
                    let selected = $(this).val();
                    console.log(selected);

                    if (selected !== "default") {
                        $("div").hide();

                        Horn.all.forEach(horn => {
                            if (horn.keyword === selected) {

                                $(`.${horn.keyword}`).addClass($(this.keyword))
                            } else {

                                $(`.${selected}`).removeClass('filtered')
                            }
                        })

                    }
                )
            }