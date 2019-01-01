// ######### TABLET SEARCH #########

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

var table_str = `
	<div class="form-group">
				<div class="col-sm-2"> 
					<select class="form-control" name="brand_number" >
								    brand_replacement			    
					</select>
				</div>
				<div class="col-sm-2"> 
				<input class="form-control gn" type="text" id="gn_number" name="gn_number" value="generic_name" placeholder="generic_name" class="form-control" disabled>
				</div>
				<div class="col-sm-1"> 
					<select class="form-control dose" name="dose_number" id="dose_number">
								    dose_replacement			    
					</select>				
				</div>
				<div class="col-sm-1"> 
				<input type="number" id="duration_number" name="duration_number" onkeyup="update_date(this)" value="1" class="form-control">
				</div>
				<div class="col-sm-2"> 
					<select class="form-control" name="frequency_number" >
								    <option>1-0-0</option>
								    <option>1-0-1</option>
								    <option>1-1-1</option>
								    <option>2-0-0</option>
								    <option>0-0-1</option>			    
					</select>
				</div>
				<div class="col-sm-1"> 
				<input type="number" name="quantity_number" value="1" class="form-control quantity">
				</div>
				<div class="col-sm-2"> 
				<input type="date" id="refill_number" name="refill_number" class="form-control">
				</div>
				<div class="col-sm-1"> 
				<button class="btn remove_button">Remove</button>
				</div>
			</div>
`

function get_data(gn){
	for ( var i=0; i < db.length; i++){
		var current_element = db[i];
		if ( current_element.name.toLowerCase() == gn.toLowerCase() ){
			return current_element;
		}
	}
	return null;
}

function update_brands(brands, c_str){
	var options = ''
	for( var i=0; i<brands.length; i++){
		var brand = brands[i];
		var option = ' <option> ' + brand  + ' </option> ';
		options = options + option;
	}
	options = options + ' <option> None </option>'
	return c_str.replace('brand_replacement', options);
}

function update_dose(doses, c_str){
	var options = ''
	for( var i=0; i<doses.length; i++){
		var dose = doses[i];
		var option = ' <option> ' + dose  + ' </option> ';
		options = options + option;
	}
	options = options + ' <option> None </option>'
	return c_str.replace('dose_replacement', options);
}

function update_names(c_str, n){
	fields = ['brand', 'gn', 'dose', 'duration', 'frequency',
		'quantity', 'refill'
	 ]

	 for( var i=0; i<fields.length; i++){
	 	field = fields[i];
	 	c_str = c_str.replace(field + '_number', field + '_' + n);
	 }
	 return c_str;
}

var table_length = 0;
$('document').ready(function(){
	$('.tablet').click(function(e){
		e.preventDefault();
		var element = $(this);
		var actual_tablet_name = element.html();
		var tablet_name = actual_tablet_name.toLowerCase();

		// alert($('#myInput').val());
		var obj = get_data(tablet_name);
		if( obj ){
			table_length += 1;
			$('#myInput').val('');
			myFunction();
			var temp_str = table_str;
			temp_str = temp_str.replace('generic_name', actual_tablet_name);
			temp_str = update_brands(obj.brands, temp_str);
			temp_str = update_dose(obj.doses, temp_str);
			temp_str = update_names(temp_str, table_length);
			$('#table_form').append(temp_str);
		}else{
			alert('Sorry this medicine is not in database');
		}

	});

	$('.remove_button').click(function(e){
		e.preventDefault();
	});

});

// ######## END TABLET SEARCH ########


// ######### MODAL CONTENT ###########

function get_selected_sum(selector_class){
	var selects = $(selector_class);
	var total = 0;
		for(var i=0; i<selects.length; i++){
			// console.log(doses.eq(i).find(':selected').text());
			total += parseInt(selects.eq(i).find(':selected').text())
		}
	return total;
}

function get_value_sum(input_class){
	var selects = $(input_class);
	var total = 0;
		for(var i=0; i<selects.length; i++){
			// console.log(doses.eq(i).find(':selected').text());
			total += parseInt(selects.eq(i).val())
		}
	return total;
}

function is_type(gn_name, med_type){
	var o = get_data(gn_name);
	if (o){
		return o.type == med_type;
	}else{
		return false;
	}
}

function get_total_type(med_type){

	var total = 0;

	var all_names = $('.gn');

	for ( var i=0; i<all_names.length; i++){
		if (is_type(all_names.eq(i).val(), med_type)){
			total = total + 1;
		}
	}
	return total;

}


$('document').ready(function(){

	$('#summary_button').on( 'click', function(e){
		// alert('summary clicked');
		var total_drugs = 0;
		var total_antibiotics = 0;
		var total_injections = 0;
		var no_of_generic_names = 0;
		var edl = 0;
		var total_dose = 0;

		$('#patient_dose').val(get_selected_sum('.dose'));
		$('#patient_drugs').val(get_value_sum('.quantity'));
		console.log(get_total_type('antibiotic'));
		$('#patient_antibiotics').val(get_total_type('antibiotic'));
		$('#patient_injections').val(get_total_type('injection'));

	});


});

// ######### END MODAL CONTENT ###########

// ########### DATE UPDATION

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

function update_date(arg){
	// alert('you changed date');
	var id = arg.getAttribute('id');
	var val = arg.value;
	if( ! val ){
		val = 0;
	}
	// alert( val);
	var now = new Date();
	now = addDays(now, parseInt(val))
	var day = now.getDate();
	var month = now.getMonth() + 1
	// alert(day);
	if ( day <= 9 ){
		day = '0' + day;
 	}
 	if ( month <= 9 ){
		month = '0' + month;
 	}

    var today =  now.getFullYear()  + '-' + month + '-' + day;
    // alert(today);
    var target = '#refill_' + id.split('_')[1];
    $(target).val(today);
}

// ########### END DATE UPDATION #########