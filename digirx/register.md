---
---

### Coming soon.....

<table class="table striped">
<thead>
<tr>
<th>Name</th>
<th>Phone</th>
<th>DTFM</th>
<th>Actions</th>
</tr>
</thead>

<tbody>
</tbody>
</table>

<!-- Modal Structure -->
<div id="modal1" class="modal modal-fixed-footer">
<div class="modal-content">
<h4>Edit Record</h4>
<div class="row">
<form class="col s12">
<div class="row">
<div class="input-field col s6">
<i class="material-icons prefix">account_circle</i>
<input placeholder="Placeholder" id="name" type="text" class="validate">
<label for="name">Name</label>
</div>
</div>
<div class="row">
<div class="input-field col s12">
<i class="material-icons prefix">phone</i>
<input id="phone" placeholder="Placeholder" type="tel" class="validate">
<label for="phone">Phone</label>
</div>
</div>
<div class="row">
<div class="input-field col s12">
<i class="material-icons prefix">signal_cellular_4_bar</i>
<input id="dtmf" placeholder="Placeholder" type="number" class="validate">
<label for="dtmf">DTFM</label>
</div>
</div>
</form>
</div>
</div>
<div class="modal-footer">
<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Update</a>
</div>
</div>

<script>
var data = [{
"id": 1,
"Name": "Kamba",
"Phone": "30-(541)656-1685",
"DTMF": 757
}, {
"id": 2,
"Name": "Feedmix",
"Phone": "967-(362)975-4248",
"DTMF": 198
}, {
"id": 3,
"Name": "Thoughtstorm",
"Phone": "358-(619)930-2339",
"DTMF": 252
}, {
"id": 4,
"Name": "Shufflebeat",
"Phone": "86-(776)437-7364",
"DTMF": 689
}, {
"id": 5,
"Name": "Reallinks",
"Phone": "55-(689)180-3162",
"DTMF": 173
}, {
"id": 6,
"Name": "Digitube",
"Phone": "1-(504)256-2986",
"DTMF": 799
}, {
"id": 7,
"Name": "Nlounge",
"Phone": "62-(928)582-6766",
"DTMF": 477
}, {
"id": 8,
"Name": "Aimbu",
"Phone": "33-(573)429-4209",
"DTMF": 445
}, {
"id": 9,
"Name": "Mydo",
"Phone": "370-(167)136-2174",
"DTMF": 854
}, {
"id": 10,
"Name": "Tagcat",
"Phone": "46-(159)429-8509",
"DTMF": 859
}];
$(document).ready(function(){
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('.modal').modal();

Materialize.updateTextFields();
});
/* 
Dynamic creation of table is not the best practice...
Better way to clone existing table and fill it with data.
*/
$(data).each(function(i, elem) {
$('.table').append('<tr><td>' + elem['Name'] +
'</td><td>' + elem['Phone'] + '</td><td>' +
elem['DTMF'] + '</td><td>' +
'\
<a href="#edit=' + elem['id'] + '"data-target="modal1" class="btn-floating waves-effect waves-light orange btn modal-trigger hoverable"><i class="material-icons">edit</i>\
</a> \
<a href="#delete=' + elem['id'] + '" class="btn-floating waves-effect waves-light red hoverable"><i class="material-icons">delete</i>\
</a> \
         </td></tr>')
});

$('.btn-floating.orange').on('click', function(){
console.log('Orange');
$('#modal1').modal('open');
// Get all TD from the cliked Button
var td = $(this).parents('tr').find('td:lt(3)');
// $td.each(function(i){
// Only the $() makes this td Object of DOM
$('#name').val($(td[0]).text());
$('#phone').val($(td[1]).text());
$('#dtmf').val($(td[2]).text());
// })
});

// Delete Button Done!!!
$('.btn-floating.red').on('click', function(){
$(this).parents('tr').remove();
})

</script>
