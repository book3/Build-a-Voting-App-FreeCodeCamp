module.exports={
  ensureAuthenticated: function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg','Not Autorized');
    res.redirect('/users/login');
  },
  times: function(amount){
    var answ='';
    for(var i=1;i<=amount;i++){
      answ+=`<div class="form-group">
        <label for="option">Option ${i}</label>
        <textarea type="text" name='options' class="form-control" required></textarea>
      </div>`;
  }
    return `${answ}`;
  },
  list: function(array){
    var ans='';
    for(var i=0;i<array.length;i++){
      ans+=`<option value="${array[i].optionBody}" >${array[i].optionBody}</option>`
    }
    return `${ans}`;
  },
  listee: function(array){
    var ans='';
    for(var i=0;i<array.length;i++){
      ans+=`<tr><td>${i+1}</td>
            <td class="container">${array[i].optionBody}</td>
            <td class="container">${array[i].optionScore}</td></tr>`
    }
    return `${ans}`;
  },
}
