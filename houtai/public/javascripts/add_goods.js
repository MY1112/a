/**
 * Created by geek on 16-8-2.
 */
$(document).ready(function() {
    bind_add_and_subtract_event();
    click_save_button();
});
function bind_add_and_subtract_event() {
    $(".subtract,.augment").click(function (event) {
        var button_name = event.target.className;
        var one_number = button_name == "augment" ? 1 : -1;
        var count = $(".count_boder").val();
        change_goods_count(one_number,count);
    });
}
function change_goods_count(one_number,count){
    count = Number(count)+one_number;
    if(count >= 0) {
        $(".count_boder").val(count);
    }
    else {
        $(".count_boder").val(0);
    }
}
function click_save_button() {
    $(".save_goods").click(function() {
        judge_info_box_null();
    });
}
function judge_info_box_null() {
    var goods_name = $(".goods_name input").val();
    var unit_price = $(".unit_price input").val();
    var unit = $(".unit input").val();
    if(goods_name == "") {
        alert("商品名称不能为空");
    }else if(unit_price == "") {
        alert("单价不能为空");
    }else if(unit == "") {
        alert("单位不能为空")
    }
}


