/**
 * Created by geek on 16-8-1.
 */
$(document).ready(function() {
    load_goods_items();
    click_confirm_event();
    //show_goods_time();
});
function get_goods_items() {
    var goods_items_string = $("#dd").html();
    var goods_items = JSON.parse(goods_items_string);
    return goods_items;
}
function load_goods_items() {
    var goods_items = get_goods_items();
    for(var i = 0; i < goods_items.length; i++) {
        var goods_count = Number(goods_items[i].goods_count);
        var goods_name = goods_items[i].goods_name;
        bind_add_and_subtract_event(i);
        click_delete_event(i,goods_name);
        $("#goods_row"+i+" .amount").val(goods_count);
    }
}
function bind_add_and_subtract_event(i) {
    $("#goods_row" + i + " .subtract , #goods_row" + i + " .augment").click(function (event) {
        var button_name = event.target.className;
        var one_number = button_name == "augment" ? 1 : -1;
        var count = $("#goods_row"+i+" .amount").val();
        change_goods_count(i,one_number,count);
    });
}
function change_goods_count(i,one_number,count){
    count = Number(count)+one_number;
    if(count >= 0) {
        $("#goods_row"+i+" .amount").val(count);
    }
    else {
        $("#goods_row"+i+" .amount").val(0);
    }
}
function click_confirm_event() {
    $(".confirm").click(function() {
        var name = $(".delete_name").html();
        $(".confirm").val(name);
    });
}
function click_delete_event(i,goods_name) {
    $("#goods_row"+i+" .delete").click(function() {
        $("#choice").attr("style","display:block");
        $(".delete_name").html(goods_name);
    });
    $(".cancel").click(function() {
        $("#choice").attr("style","display:none");
    });
}
//function show_goods_time() {
//    var date_string = get_time();
//    var time = $("#goods_time").html();
//    if(time == "") {
//        $("#goods_time").html(date_string);
//    }
//}
//function judge_date_String(num){
//    return num < 10 ? '0' + num : num;
//}
//function get_time(){
//    var currentDate = new Date(),
//        year = judge_date_String(currentDate.getFullYear()),
//        month = judge_date_String(currentDate.getMonth() + 1),
//        date = judge_date_String(currentDate.getDate()),
//        hour = judge_date_String(currentDate.getHours()),
//        minute = judge_date_String(currentDate.getMinutes()),
//        second = judge_date_String(currentDate.getSeconds()),
//        date_string = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
//    return date_string;
//}
