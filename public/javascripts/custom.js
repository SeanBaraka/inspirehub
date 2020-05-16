$(document).ready(() => {
    
    var dropdown = $('.dropdown')
    var dropdownActivator = $('#dropdown-link')

    dropdownActivator.on('mouseover', (e) => {
        if(dropdown.hasClass('active')) return;
        dropdown.addClass('active')
    })
    dropdownActivator.on('mouseleave', (e) => {
        if(dropdown.hasClass('active')) {
            dropdown.removeClass('active')
        }
    })


    /* Tab controls and swicthing */
    var tabControl = $('.tab-control')

    tabControl.click((e) => {
        e.preventDefault()

       e.target.classList.add('tab-active')
       console.log($(e.target).siblings().removeClass('tab-active'))
        var tabBodyHash = e.target.hash 

        var tabBody = $(`${tabBodyHash.toString()}`)

        tabBody.addClass('active')
        tabBody.siblings().removeClass('active')
    })


    /* adding a background effect to the nave on scrolling */
    var nav = $('nav')

    $(document).scroll(function() {
        
       var something = $('html').scrollTop()
       if(nav.offset().top > 0) {
           nav.css({
            'background-color': '#fafafa',
            'box-shadow': '0 0 1em rgba(0,0,0,.08)'
           })

       } else {
           nav.css({
               'background': 'none',
               'box-shadow': 'none'
           })
       }
    })


    /* Activating navigation links in dashboard */
    var dashboardLinks = $('.dashboard-link')

    dashboardLinks.click( (e) => {
        // e.preventDefault()
        
        if(!e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active')
            $(e.currentTarget).siblings().removeClass('active')
        }
        
    })

})