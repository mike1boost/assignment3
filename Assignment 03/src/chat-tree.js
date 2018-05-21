function ChatTree(element) {
    function load(items) {
        clear();
        keyboardListener(element);
        manageLoad(items, 0);
    }

    function clear() {
        $('li').remove()
    }

    function manageLoad(items, count, $curElement) {

        const $ul = $curElement !== undefined ? $curElement : $(element);

        for(let item of items){
            const $li = $(`<li tabindex="1" id="${count}">${shiftChildren(count)} ${item.name}</li>`);
           // $li.css("display", "block");
            $li.data(item);
            $li.click(() => {
                $li.focus();
                lightClicked();
            });

            if (item.type === 'group') {
                    $li.dblclick(() => {
                    expandOr($li,  count);
                });

            }
            $curElement !== undefined ? $ul.after($li) : $ul.append($li);

        }
    }

    function lightClicked(){
        $('li').css("background-color", "#fdfffd");
        $(document.activeElement).css("background-color", "#72ff7d");
    }

    function showChildren($li, item, count){
        if (item.show === undefined) {
            item.show = true;
            manageLoad(item.items, ++count, $li);
        }
        let $li_= $li.next();
        const size = $li_.attr("id");
        while($li_.attr("id") === size){
            item.show = true;
            $li_.show();
            $li_=$li_.next()
        }
    }
    function hideChildren($li, item) {
        let $li_= $li.next();
        const size = $li_.attr("id");
        while($li_.attr("id") >= size){
            item.show = false;
            $li_.hide();
            $li_=$li_.next()
        }
    }

    function expandOr($li,  count) {
        let item = $li.data()
        console.log(item.show)
        if (item.show) {
            hideChildren($li, item);
        }
        else {
            showChildren($li, item, count);
        }
    }

    function keyboardListener(element) {
        const Arrow = {
            Down: 40,
            Up: 38,
            Right: 39,
            Left: 37,
            Enter: 13,
        };
        // $(document.activeElement)
        $(element).keydown(function(event) {
            switch (event.which) {
                case Arrow.Enter:
                    EnterArrow();
                    break;
                case Arrow.Left:
                    LeftArrow();
                    break;
                case Arrow.Up:
                    UptArrow();
                    break;
                case Arrow.Right:
                    RightArrow();
                    break;
                case Arrow.Down:
                    DownArrow();
                    break;
                default:
                    return;
            }
        });
    }

    function RightArrow() {
        let $li = $(document.activeElement);
        let item = $li.data();
        const count = $li.attr("id");

        if(item.type === 'group')
            showChildren($li, item, count);
    }
    function LeftArrow() {
        let $li = $(document.activeElement);
        let item = $li.data();
        if(item.type === 'group'){
            if(item.show){
                hideChildren($li, item);
            }
            else{
                const size = $li.attr("id");
                const $li_size=$li.prev().attr("id");

                while(size === $li_size){
                    $li=$li.prev();
                    if($li.data().type === "group"){
                        $li.focus();
                        lightClicked();
                        break;
                    }

                }


            }

        }

    }
    function UptArrow() {
        let $li = $(document.activeElement);

        do{
            $li = $li.prev();
        } while($li.css('display') === 'none')

        $li.focus();
        lightClicked();
    }
    function DownArrow() {
        let $li = $(document.activeElement);

        do{
            $li = $li.next();
        } while($li.css('display') === 'none');

        $li.focus();
        lightClicked();
    }
    function EnterArrow() {
        let $li = $(document.activeElement);
        let item = $li.data();
        console.log($li.data());
        const count = $li.attr("id");

        if(item.type === 'group')
            expandOr($li, item, count);
    }

    return {
        load,
        clear,
        element,
    };
}

function shiftChildren(count) {
    var str="";
    str = "&#160".repeat(count);
    return str;
}

