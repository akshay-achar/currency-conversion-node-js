let fromDropdown = $('#from-dropdown')
fromDropdown.empty()
fromDropdown.append('<option disabled>Choose From Currency </option>')
fromDropdown.prop('selectedIndex', 0)
let toDropdown = $('#to-dropdown')
toDropdown.empty()
toDropdown.append('<option disabled>Choose To Currency </option>')
toDropdown.prop('selectedIndex', 0)

const url = '/available-currencies'
$.getJSON(url, function (data) {
  $.each(data, function(key, value) {
    fromDropdown.append($('<option></option>').attr('value', key).text(value))
    toDropdown.append($('<option></option>').attr('value', key).text(value))
  })
})
let conversionForm = $('#conversion-form')
conversionForm.on('submit', (e) => {
  e.preventDefault()
  const fromValue = $('#from-dropdown').val()
  const toValue = $('#to-dropdown').val()
  const fromAmount = $('#fromAmount').val()
  var pattern = /^(\d+\.?\d*)$|(\d*\.?\d+)$/;
  if (fromValue === null) {
    alert('Please select the From Currency')
  }
  else if (toValue === null) {
    alert('Please select the To Currency')
  } else if (fromValue === toValue) {
    alert('From Currency and To Currency Cannot be Same')  
  } else if (fromAmount < 0) {
    alert('Please Enter a Positive Number in the From Amount')
  } else if (! pattern.test(fromAmount)) {
    alert('Please Enter Numbers Only')
  }
    else {
    $('#toAmount').val('')
    let data = {
      from: fromValue,
      to: toValue,
      fromAmount: fromAmount
    }
    $.post(conversionForm.attr('action'), data, (result) => {
      if (result.status) {
        $('#toAmount').val(result.success)
      } else {
        alert(result.error)
      }
    })
  }
})