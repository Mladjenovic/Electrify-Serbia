

function expand(){
    // e.preventDefault();
    if($('.new-incident').is(':hidden')){
        $('.incidents').hide("fast");

        $('.new-incident').show("slow");
    }
}

function openSection(secName){
    $('.incident-section').hide();
    switch(secName){
        case 'basicInfo':
            if($('.basic-info').is(':hidden')){
                $('.basic-info').show();
            }
        break;
        case 'devices':
            if($('.devices').is(':hidden')){
                $('.devices').show();
            }
        break;
        case 'resolution':
            $('.resolution').show();

            if($('.resolution').is(':hidden')){
                $('.resolution').show();
            }
        break;
    }
}