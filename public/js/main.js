$(function(){
    /**
     * product details carousel
     */
    $('.js-possible-img').on('click',function(){
        var $t = $(this);
        var target = $('img.js-main-img');

        // same image?
        if($t.attr('src')===target.attr('src'))
            return false;

        target.addClass('animated fadeOutDown');
        target.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function(){
            target.removeClass('animated fadeOutDown');
            target.attr('src',$t.attr('src'));
            target.addClass('animated fadeInDown');
        });
    });


    /**
     * a generic function to set # of items in header/navbar
     * @param items = number of items in the cart
     */
    var updateCartItems = function(items){
        var $c=$("#cart");
        if(items){
            $c.text("Cart ("+items+" items)");
        }else {
            $c.text("Cart");
        }
    };


    /**
     * widget setup
     * see http://print.io/platform-web-customization for more info
     * TODO: add in your recipeId
     */
    PIO.config({
        recipeId:"6cfb4f30-34c7-4cf6-9490-f51925650811",
        url:"https://api.print.io/widget/",
        fns:{
            onCartChange:function(cart){
                var numItems = cart.items.length;
                updateCartItems(numItems);
            }
        }
    });


    /**
     * widget open on product click
     */
    $('.js-pio-open').on('click',function(e){
        e.preventDefault();
        PIO.open({
            items:[{productId:$(this).attr('data-productid')}],
            goTo:'tpl-newcustomize'
        });
    });


    /**
     * widget open on cart click
     */
    $('.js-pio-cart').on('click',function(e){
        e.preventDefault();
        PIO.open({
            goTo:'tpl-cart'
        });
    });

    /**
     * on init, check the cart right away
     */
    updateCartItems(PIO.getNumItems());

})